export const CONTRACT_ADDRESS = "0x90AC79Fc5558A534e8A641960d9E157e22d0F5eF";

export const CONTRACT_ABI = [
  "function addWish(string memory _name) public",
  "function fulfillWish(uint _index) public",
  "function deleteWish(uint _index) public",
  "function getWishes() public view returns (tuple(string name, bool isFullfilled, uint256 createdAt)[])",
  "function getWish(uint256 _index) public view returns (tuple(string name, bool isFullfilled, uint256 createdAt))",
  "function owner() public view returns (address)"
];