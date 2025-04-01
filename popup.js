// Global variables
let host;
let currentUrl;
let domainArray;

// DOM Elements
const elements = {
	cookieInput: document.getElementById('cookieInput'),
	filterInput: document.getElementById('filterInput'),
	domainCookieSelector: document.getElementById('domainCookieSelector'),
	pathCookieSelector: document.getElementById('pathCookieSelector'),
	domainCookieInput: document.getElementById('domainCookieInput'),
	pathCookieInput: document.getElementById('pathCookieInput'),
	domainFilterSelector: document.getElementById('domainFilterSelector'),
	pathFilterSelector: document.getElementById('pathFilterSelector'),
	showOl: document.getElementById('showOl')
};

// Initialize the extension
document.addEventListener('DOMContentLoaded', async () => {
	try {
		const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
		host = getDomainFromUrl(tab.url);
		currentUrl = tab.url;
		await listCurrentCookies();
		elements.cookieInput.focus();
	} catch (error) {
		console.error('Error initializing:', error);
	}
});

// Event Listeners
elements.filterInput.addEventListener('keyup', (event) => {
	if (event.key === 'Backspace') {
		showAllList();
	} else if (event.key === 'Enter') {
		showAllList();
		return;
	}
	multiFilter(elements.filterInput.value);
});

elements.cookieInput.addEventListener('keypress', async (event) => {
	if (event.key === 'Enter') {
		try {
			const cookieArray = elements.cookieInput.value.split(';');
			for (const cookie of cookieArray) {
				const [name, value, domain, path] = cookie.split(',');
				await chrome.cookies.set({
					url: currentUrl,
					name,
					value,
					domain,
					path
				});
			}
			elements.cookieInput.value = '';
			await listCurrentCookies();
		} catch (error) {
			console.error('Error injecting cookies:', error);
			alert('Failed to inject cookies. Please check the format and try again.');
		}
	}
});

elements.domainFilterSelector.addEventListener('change', () => {
	showAllList();
	const domainF = elements.domainFilterSelector.value;
	const pathF = elements.pathFilterSelector.value;
	const keywords = `${domainF === '-' ? '' : `|${domainF}|`} ${pathF === '-' ? '' : `|${pathF}`}`;
	multiFilter(keywords);
});

elements.pathFilterSelector.addEventListener('change', () => {
	showAllList();
	const domainF = elements.domainFilterSelector.value;
	const pathF = elements.pathFilterSelector.value;
	const keywords = `${domainF === '-' ? '' : `|${domainF}|`} ${pathF === '-' ? '' : `|${pathF}`}`;
	multiFilter(keywords);
});

// Double click handlers for custom inputs
elements.pathCookieSelector.addEventListener('dblclick', () => {
	elements.pathCookieSelector.style.display = 'none';
	elements.pathCookieInput.style.display = 'block';
});

elements.pathCookieInput.addEventListener('dblclick', () => {
	elements.pathCookieSelector.style.display = 'block';
	elements.pathCookieInput.style.display = 'none';
});

elements.domainCookieSelector.addEventListener('dblclick', () => {
	elements.domainCookieSelector.style.display = 'none';
	elements.domainCookieInput.style.display = 'block';
});

elements.domainCookieInput.addEventListener('dblclick', () => {
	elements.domainCookieSelector.style.display = 'block';
	elements.domainCookieInput.style.display = 'none';
});

// Utility Functions
function getDomainFromUrl(url) {
	if (!url) return 'null';
	const regex = /.*:\/\/([^/]*).*/;
	const match = url.match(regex);
	return match ? match[1] : 'null';
}

function addlistShow(val) {
	const li = document.createElement('li');
	const span = document.createElement('span');
	span.textContent = val;
	li.appendChild(span);
	elements.showOl.appendChild(li);
}

function clearList() {
	elements.showOl.innerHTML = '';
}

function showAllList() {
	const items = elements.showOl.getElementsByTagName('li');
	Array.from(items).forEach(item => item.style.display = '');
}

function multiFilter(keywords) {
	const items = elements.showOl.getElementsByTagName('li');
	const keywordArray = keywords.split(' ');
	
	Array.from(items).forEach(item => {
		const span = item.querySelector('span');
		for (const keyword of keywordArray) {
			const escapedKeyword = keyword.replace(/\|/gi, '\\|');
			if (!new RegExp(escapedKeyword, 'i').test(span.textContent)) {
				item.style.display = 'none';
				break;
			}
		}
	});
}

// Array prototype extension
Array.prototype.removeDuplication = function() {
	for (let i = 0; i < this.length; i++) {
		for (let j = i + 1; j < this.length; j++) {
			if (this[j] === '/' || this[i] === this[j]) {
				this.splice(j, 1);
				i = -1;
				break;
			}
		}
	}
};

// Main cookie listing function
async function listCurrentCookies() {
	elements.filterInput.focus();
	clearList();
	
	try {
		const cookies = await chrome.cookies.getAll({ url: currentUrl });
		const domainArray = [];
		const pathArray = [];
		
		for (const cookie of cookies) {
			domainArray.push(cookie.domain);
			pathArray.push(cookie.path);
			addlistShow(`${cookie.name}|${cookie.value}|${cookie.domain}|${cookie.path}`);
		}
		
		domainArray.removeDuplication();
		pathArray.removeDuplication();
		
		// Clear existing options
		elements.domainFilterSelector.innerHTML = '<option>-</option>';
		elements.domainCookieSelector.innerHTML = '';
		elements.pathFilterSelector.innerHTML = '<option>/</option>';
		elements.pathCookieSelector.innerHTML = '<option>/</option>';
		
		// Add new options
		for (const domain of domainArray) {
			elements.domainFilterSelector.add(new Option(domain));
			elements.domainCookieSelector.add(new Option(domain));
		}
		
		for (const path of pathArray) {
			elements.pathFilterSelector.add(new Option(path));
			elements.pathCookieSelector.add(new Option(path));
		}
	} catch (error) {
		console.error('Error listing cookies:', error);
		alert('Failed to list cookies. Please try again.');
	}
}