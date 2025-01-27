// 🏦 Bank and Account System 
// Bank Class: Manages multiple accounts
class Bank {
    constructor() {
        this.accounts = []; // Stores all accounts in the bank
    }

    // Create a new account
    createAccount(name, initialDeposit = 0) {
        const account = new Account(name, initialDeposit);
        this.accounts.push(account);
        return account;
}
    // Find an account by name
    findAccount(name) {
        return this.accounts.find(account => account.name === name);
    }
}    
// Account Class: Represents a single user's account
class Account {
    constructor(name, balance = 0) {
        this.name = name; // Account holder's name
        this.balance = balance; // Initial balance (default is 0)
        this.transactionHistory = []; // Keeps a record of all transactions
    }

    // Deposit money
    deposit(amount) {
        if (amount <= 0) {
            console.log('Deposit amount must be greater than zero.');
            return;
        }
        this.balance += amount;
        this.transactionHistory.push({ transactionType: 'Deposit', amount });
        console.log(`Deposited $${amount} into ${this.name}'s account.`);
    }

    // Withdraw money
    withdraw(amount) {
        if (amount <= 0) {
            console.log('Withdrawal amount must be greater than zero.');
            return;
        }
        if (amount > this.balance) {
            console.log('Insufficient funds.');
            return;
        }
        this.balance -= amount;
        this.transactionHistory.push({ transactionType: 'Withdrawal', amount });
        console.log(`Withdrew $${amount} from ${this.name}'s account.`);
    }

    // Transfer money to another account
    transfer(amount, recipientAccount) {
        if (amount <= 0) {
            console.log('Transfer amount must be greater than zero.');
            return;
        }
        if (amount > this.balance) {
            console.log('Insufficient funds for transfer.');
            return;
        }
        if (!(recipientAccount instanceof Account)) {
            console.log('Recipient must be a valid account.');
            return;
        }
        this.balance -= amount;
        recipientAccount.balance += amount;

        // Update transaction history for both accounts
        this.transactionHistory.push({ transactionType: 'Transfer', amount, to: recipientAccount.name });
        recipientAccount.transactionHistory.push({ transactionType: 'Received', amount, from: this.name });

        console.log(`Transferred $${amount} from ${this.name} to ${recipientAccount.name}.`);
    }

    // Check account balance
    checkBalance() {
        console.log(`${this.name}'s current balance: $${this.balance}`);
        return this.balance;
    }
}    
    

//<-------------------------------DO NOT WRITE BELOW THIS LINE------------------------------>

// Function to test bank operations
function testBankOperations() {
    const bank = new Bank();

    // Create new accounts
    const johnAccount = bank.createAccount('John Doe', 1000);
    const janeAccount = bank.createAccount('Jane Doe', 500);
    console.log('Accounts created:', johnAccount, janeAccount);

    // Perform some operations on John's account
    johnAccount.deposit(500);
    johnAccount.withdraw(200);

    // Perform a transfer from John to Jane
    johnAccount.transfer(300, janeAccount);

    // Check balances
    const johnFinalBalance = johnAccount.checkBalance();
    const janeFinalBalance = janeAccount.checkBalance();
    console.log('John\'s balance:', johnFinalBalance);
    console.log('Jane\'s balance:', janeFinalBalance);

    // Return balances for testing
    return { 
        johnFinalBalance, 
        janeFinalBalance, 
        johnTransactionHistory: johnAccount.transactionHistory, 
        janeTransactionHistory: janeAccount.transactionHistory 
    };
}

module.exports = testBankOperations;

//<-------------------------------DO NOT WRITE ABOVE THIS LINE------------------------------>


console.log(testBankOperations());
