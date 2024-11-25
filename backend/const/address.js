require("dotenv").config();

const contractAddress =
  process.env.CONTRACT_ADDRESS || "0xe9D7970A79a7542C3969f9F5CD098418817D3cc7";
const fujiProviderUrl =
  process.env.FUJI_PROVIDER_URL || "https://api.avax-test.network/ext/bc/C/rpc";

const generateReferralLink = async (address) => {
  const referralLink = `${process.env.CORS_ORIGIN}?ref=${address}`;
  return referralLink;
};

module.exports = { contractAddress, fujiProviderUrl, generateReferralLink };
