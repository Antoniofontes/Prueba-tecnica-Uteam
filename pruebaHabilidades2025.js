
const clients = [{
    id: 1,
    taxNumber: '86620855',
    name: 'HECTOR ACUÑA BOLAÑOS'
},
{
    id: 2,
    taxNumber: '7317855K',
    name: 'JESUS RODRIGUEZ ALVAREZ'
},
{
    id: 3,
    taxNumber: '73826497',
    name: 'ANDRES NADAL MOLINA'
},
{
    id: 4,
    taxNumber: '88587715',
    name: 'SALVADOR ARNEDO MANRIQUEZ'
},
{
    id: 5,
    taxNumber: '94020190',
    name: 'VICTOR MANUEL ROJAS LUCAS'
},
{
    id: 6,
    taxNumber: '99804238',
    name: 'MOHAMED FERRE SAMPER'
}
];
const accounts = [{
    clientId: 6,
    bankId: 1,
    balance: 15000
},
{
    clientId: 1,
    bankId: 3,
    balance: 18000
},
{
    clientId: 5,
    bankId: 3,
    balance: 135000
},
{
    clientId: 2,
    bankId: 2,
    balance: 5600
},
{
    clientId: 3,
    bankId: 1,
    balance: 23000
},
{
    clientId: 5,
    bankId: 2,
    balance: 15000
},
{
    clientId: 3,
    bankId: 3,
    balance: 45900
},
{
    clientId: 2,
    bankId: 3,
    balance: 19000
},
{
    clientId: 4,
    bankId: 3,
    balance: 51000
},
{
    clientId: 5,
    bankId: 1,
    balance: 89000
},
{
    clientId: 1,
    bankId: 2,
    balance: 1600
},
{
    clientId: 5,
    bankId: 3,
    balance: 37500
},
{
    clientId: 6,
    bankId: 1,
    balance: 19200
},
{
    clientId: 2,
    bankId: 3,
    balance: 10000
},
{
    clientId: 3,
    bankId: 2,
    balance: 5400
},
{
    clientId: 3,
    bankId: 1,
    balance: 9000
},
{
    clientId: 4,
    bankId: 3,
    balance: 13500
},
{
    clientId: 2,
    bankId: 1,
    balance: 38200
},
{
    clientId: 5,
    bankId: 2,
    balance: 17000
},
{
    clientId: 1,
    bankId: 3,
    balance: 1000
},
{
    clientId: 5,
    bankId: 2,
    balance: 600
},
{
    clientId: 6,
    bankId: 1,
    balance: 16200
},
{
    clientId: 2,
    bankId: 2,
    balance: 10000
}
]
const banks = [{
    id: 1,
    name: 'SANTANDER'
},
{
    id: 2,
    name: 'CHILE'
},
{
    id: 3,
    name: 'ESTADO'
}
];


function listClientsIds() {
    return clients.map(client => client.id);
  }

function listClientsIdSortedByRut(){
    const rut = clients.map(client => client.taxNumber).sort((a, b) => a.localeCompare(b));
    return rut.map(rut => {
        const client = clients.find(client => client.taxNumber === rut);
        return client.id;
    });
}

function listClientsNamesSortedByTotalBalance() {
    const clientBalances = clients.map(client => {
        const totalBalance = accounts
            .filter(account => account.clientId === client.id)
            .reduce((sum, account) => sum + account.balance, 0);
        return { name: client.name, totalBalance };
    });

    clientBalances.sort((a, b) => b.totalBalance - a.totalBalance);

    return clientBalances.map(client => client.name);
}

function banksClientsTaxNumbers() {
    const result = {};
  
    banks.forEach((bank) => {
      const accountsInBank = accounts.filter(acc => acc.bankId === bank.id);
  
      const clientIds = [...new Set(accountsInBank.map(acc => acc.clientId))];
  
      const sortedTaxNumbers = clientIds
        .map(id => clients.find(client => client.id === id))
        .sort((a, b) => a.name.localeCompare(b.name))
        .map(client => client.taxNumber);
  
      result[bank.name] = sortedTaxNumbers;
    });
  
    return result;
  }

  function richClientsBalances() {
    const santanderId = banks.find(bank => bank.name === 'SANTANDER')?.id;
  
    const santanderAccounts = accounts.filter(acc => acc.bankId === santanderId);
  
    const balanceByClient = {};
  
    santanderAccounts.forEach(acc => {
      balanceByClient[acc.clientId] = (balanceByClient[acc.clientId] || 0) + acc.balance;
    });
  
    const richBalances = Object.values(balanceByClient)
      .filter(balance => balance > 25000)
      .sort((a, b) => b - a); // de mayor a menor
  
    return richBalances;
  }

  function banksRankingByTotalBalance() {
    return banks
      .map(bank => {
        const total = accounts
          .filter(acc => acc.bankId === bank.id)
          .reduce((sum, acc) => sum + acc.balance, 0);
  
        return { id: bank.id, total };
      })
      .sort((a, b) => a.total - b.total)
      .map(bank => bank.id);
  }

  function banksFidelity() {
    const result = {};
  
    const clientBanks = {};
  
    accounts.forEach(acc => {
      if (!clientBanks[acc.clientId]) {
        clientBanks[acc.clientId] = new Set();
      }
      clientBanks[acc.clientId].add(acc.bankId);
    });
  
    const exclusiveClients = Object.entries(clientBanks).filter(([_, banksSet]) => banksSet.size === 1);
  
    exclusiveClients.forEach(([clientId, banksSet]) => {
      const bankId = [...banksSet][0];
      const bankName = banks.find(b => b.id === bankId)?.name;
  
      if (bankName) {
        result[bankName] = (result[bankName] || 0) + 1;
      }
    });
  
    return result;
  }
  
  function banksPoorClients() {
    const result = {};
  
    banks.forEach(bank => {
      const accountsInBank = accounts.filter(acc => acc.bankId === bank.id);
  
      const clientBalances = {};
  
      accountsInBank.forEach(acc => {
        clientBalances[acc.clientId] = (clientBalances[acc.clientId] || 0) + acc.balance;
      });
  
      let poorestClientId = null;
      let minBalance = Infinity;
  
      for (const [clientId, balance] of Object.entries(clientBalances)) {
        if (balance < minBalance) {
          minBalance = balance;
          poorestClientId = Number(clientId);
        }
      }
  
      result[bank.name] = "Client Id " + poorestClientId;
    });
  
    return result;
  }

  function newClientRanking() {
    const newClient = {
      id: clients.length + 1, 
      taxNumber: '12345678K',
      name: 'Antonio Fontes'
    };
    clients.push(newClient);
  
    const estadoBankId = banks.find(bank => bank.name === 'ESTADO')?.id;
  
    accounts.push({
      clientId: newClient.id,
      bankId: estadoBankId,
      balance: 9000
    });
  
    const ranking = listClientsNamesSortedByTotalBalance();
  
    const position = ranking.findIndex(name => name === newClient.name) + 1;
  
    return position;
  }
  
  

console.log('Pregunta 0');
console.log('listClientsById', listClientsIds());
console.log('Pregunta 1');
console.log('listClientsIdSortedByRut', listClientsIdSortedByRut());
console.log('Pregunta 2');
console.log('listClientsNamesSortedByBalance', listClientsNamesSortedByTotalBalance());
console.log('Pregunta 3');
console.log('banksClientsTaxNumbers', banksClientsTaxNumbers());
console.log('Pregunta 4');
console.log('richClientsBalances', richClientsBalances());
console.log('Pregunta 5');
console.log('banksRankingByTotalBalance', banksRankingByTotalBalance());
console.log('Pregunta 6');
console.log('banksFidelity', banksFidelity());
console.log('Pregunta 7');
console.log('banksPoorClients', banksPoorClients());
console.log('Pregunta 8');
console.log('newClientRanking', newClientRanking());