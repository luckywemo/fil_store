// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract FilStore is ERC721, Ownable {
    using Strings for uint256;

    uint256 private _tokenIds;

    struct Product {
        uint256 id;
        string name;
        string description;
        uint256 price;
        string imageURI;
        string metadataURI;
        bool isNFT;
        address owner;
    }

    mapping(uint256 => Product) public products;
    mapping(address => uint256[]) public userProducts;

    event ProductCreated(uint256 indexed productId, string name, uint256 price);
    event ProductPurchased(uint256 indexed productId, address buyer);

    constructor(address initialOwner) ERC721("FilStore", "FILSTORE") Ownable(initialOwner) {}

    function createProduct(
        string memory name,
        string memory description,
        uint256 price,
        string memory imageURI,
        string memory metadataURI,
        bool isNFT
    ) public onlyOwner returns (uint256) {
        _tokenIds++;
        uint256 newProductId = _tokenIds;

        products[newProductId] = Product({
            id: newProductId,
            name: name,
            description: description,
            price: price,
            imageURI: imageURI,
            metadataURI: metadataURI,
            isNFT: isNFT,
            owner: address(this)
        });

        if (isNFT) {
            _safeMint(address(this), newProductId);
        }

        emit ProductCreated(newProductId, name, price);
        return newProductId;
    }

    function purchaseProduct(uint256 productId) public payable {
        Product storage product = products[productId];
        require(product.owner == address(this), "Product not available");
        require(msg.value >= product.price, "Insufficient payment");

        if (product.isNFT) {
            _transfer(address(this), msg.sender, productId);
        }

        product.owner = msg.sender;
        userProducts[msg.sender].push(productId);

        emit ProductPurchased(productId, msg.sender);
    }

    function withdraw() public onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }

    function getUserProducts(address user) public view returns (uint256[] memory) {
        return userProducts[user];
    }

    function getProduct(uint256 productId) public view returns (Product memory) {
        return products[productId];
    }
} 