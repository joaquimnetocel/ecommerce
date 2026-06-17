// Comprehensive currency symbol mapping
const currencySymbols = {
	AUD: '$', // Australian Dollar
	USD: '$', // US Dollar
	EUR: '€', // Euro
	GBP: '£', // British Pound
	JPY: '¥', // Japanese Yen
	CAD: '$', // Canadian Dollar
	CHF: 'Fr.', // Swiss Franc
	CNY: '¥', // Chinese Yuan
	INR: '₹', // Indian Rupee
	BRL: 'R$', // Brazilian Real
	RUB: '₽', // Russian Rubles
	KRW: '₩', // South Korean Won
	NZD: '$', // New Zealand Dollar
	MXN: '$', // Mexican Peso
	SGD: '$', // Singapore Dollar
	HKD: '$', // Hong Kong Dollar
	HUF: 'Ft', // Hungarian Forint
	ISK: 'kr', // Icelandic Króna
	CLP: '$', // Chilean Peso
	TWD: 'NT$', // Taiwan Dollar
	IDR: 'Rp', // Indonesian Rupiah
	VND: '₫', // Vietnamese Dong
	// Add more currencies as needed
};

type typeCodigoDaMoeda = keyof typeof currencySymbols;

export const funcaoFormatarPreco = (price: number, currencyCode: typeCodigoDaMoeda = 'BRL') => {
	// Default to USD if no currency code provided
	// Get the symbol or use the code if symbol not found
	const symbol = currencySymbols[currencyCode];
	// List of currencies that don't use decimal places
	const nonDecimalCurrencies = ['JPY', 'KRW', 'HUF', 'ISK', 'CLP', 'TWD', 'IDR', 'VND'];
	// Format the price - some currencies don't use decimal places
	const formattedPrice = nonDecimalCurrencies.includes(currencyCode)
		? Math.round(price).toString()
		: price.toFixed(2);
	// Special case for certain currencies: include the code after the price
	if (
		currencyCode === 'AUD' ||
		currencyCode === 'CAD' ||
		currencyCode === 'NZD' ||
		currencyCode === 'SGD' ||
		currencyCode === 'HKD' ||
		currencyCode === 'JPY' ||
		currencyCode === 'MXN'
	) {
		return `${symbol}${formattedPrice} ${currencyCode}`;
	}
	return `${symbol}${formattedPrice}`;
};
