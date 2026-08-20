const authForm = document.getElementById('authForm');
const formTitle = document.getElementById('formTitle');
const formSubtitle = document.getElementById('formSubtitle');
const email = document.getElementById('email');
const confirmPassword = document.getElementById('confirmPassword');
const submitButton = authForm.querySelector('button[type="submit"]');
const message = document.getElementById('message');
const switchPrompt = document.getElementById('switchPrompt');
const switchMode = document.getElementById('switchMode');
const username = document.getElementById('username');
const password = document.getElementById('password');
let isSignUp = false;

function getAccounts() {
	return JSON.parse(localStorage.getItem('virtualizationCatLabAccounts') || '[]');
}

switchMode.addEventListener('click', function () {
	isSignUp = !isSignUp;
	formTitle.textContent = isSignUp ? 'Create account' : 'Login';
	formSubtitle.textContent = isSignUp ? 'Join the lab and start exploring.' : 'Welcome back. Sign in to continue.';
	email.hidden = !isSignUp;
	confirmPassword.hidden = !isSignUp;
	email.required = isSignUp;
	confirmPassword.required = isSignUp;
	submitButton.textContent = isSignUp ? 'Sign up' : 'Log in';
	switchPrompt.firstChild.textContent = isSignUp ? 'Already have an account? ' : 'New here? ';
	switchMode.textContent = isSignUp ? 'Log in' : 'Create an account';
	message.textContent = '';
});

authForm.addEventListener('submit', function (event) {
	event.preventDefault();
	const accounts = getAccounts();

	if (isSignUp) {
		if (confirmPassword.value !== password.value) {
			alert('Passwords do not match.');
			return;
		}

		if (accounts.some(function (account) {
			return account.username.toLowerCase() === username.value.trim().toLowerCase();
		})) {
			alert('That username already has an account. Please log in.');
			return;
		}

		accounts.push({
			username: username.value.trim(),
			email: email.value.trim(),
			password: password.value
		});
		localStorage.setItem('virtualizationCatLabAccounts', JSON.stringify(accounts));
		message.textContent = 'Account created successfully!';
		message.className = 'success';
		return;
	}

	const account = accounts.find(function (savedAccount) {
		return savedAccount.username.toLowerCase() === username.value.trim().toLowerCase();
	});

	if (!account) {
		alert('No account was found for this username. Please create an account first.');
		return;
	}

	if (account.password !== password.value) {
		alert('Incorrect password. Please try again.');
		return;
	}

	localStorage.setItem('virtualizationCatLabCurrentUser', account.username);
	window.location.href = 'welcome.html';
});
