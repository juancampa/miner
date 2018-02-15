const { root, human, account } = program.refs;

export async function init() {
  await root.account.set(account);
  return program.setTimer('check', 0, 5);
}

export async function timer({ key }) {
  const { balance, hashrate } = await account.query('{ balance, hashrate }');
  const { state } = program;

  if (balance < state.balance) {
    await human.tell({ text: `You just got a tx. Balance ${state.balance} -> ${balance}, hashrate: ${hashrate}` });
  }

  if (balance && state.balance === undefined) {
    await human.tell({ text: `Miner just started reporting` });
  }

  if (hashrate < 5) {
    await human.tell({ text: `Hashrate is very low: ${hashrate}` });
  }

  state.balance = balance;
  state.hashrate = hashrate;
  return program.save();
}

