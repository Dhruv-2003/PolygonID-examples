async function main() {
  const circuitId = "credentialAtomicQuerySig";
  const validatorAddress = "0xb1e86C4c687B85520eF4fd2a0d14e81970a15aFB";

  const schemaHash = "020b434e4e1ea7175c7617f31fd0e3bb"; // extracted from PID Platform

  const schemaEnd = fromLittleEndian(hexToBytes(schemaHash));

  const query = {
    schema: ethers.BigNumber.from(schemaEnd),
    slotIndex: 2,
    operator: 2,
    value: [20020101, ...new Array(63).fill(0).map((i) => 0)],
    circuitId,
  };

  // add the address of the contract just deployed
  ERC20VerifierAddress = "0xfBa01D7D8Ebe71d31670c8cfA6Bff6f804d9D8fa";

  let erc20Verifier = await hre.ethers.getContractAt(
    "ERC20Verifier",
    ERC20VerifierAddress
  );

  try {
    await erc20Verifier.setZKPRequest(1, validatorAddress, query);
    console.log("Request set");
  } catch (e) {
    console.log("error: ", e);
  }
}

function hexToBytes(hex) {
  for (var bytes = [], c = 0; c < hex.length; c += 2)
    bytes.push(parseInt(hex.substr(c, 2), 16));
  return bytes;
}

function fromLittleEndian(bytes) {
  const n256 = BigInt(256);
  let result = BigInt(0);
  let base = BigInt(1);
  bytes.forEach((byte) => {
    result += base * BigInt(byte);
    base = base * n256;
  });
  return result;
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
