pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;   // required to pass structs as function parameter and return values

/// @title Image Gallery
/// @author Sven Meyer
/// @notice only implements very basic functionality (add, retrieve)
/// @dev functions passing structs can be tested using the experimental ABIEncoderV2
contract Gallery {

    address public owner;

    /// @dev always good to know who deployed the contract
    constructor() public {
        owner = msg.sender;
    }

    // storage value for basic testing

    uint storedData;

    function set(uint x) public {
        storedData = x;
    }

    function get() public view returns (uint) {
        return storedData;
    }

    uint itemCount = 0; // private - we do not want direct access to it

    function getNumberofItems() public view returns (uint) {
        return itemCount;
    }

    /// @dev data struct to store one gallery item (image url & caption)
    struct Item {
        uint   id;
        string url;
        // string mediatype;
        string caption;
    }

    /// @dev items is a mapping from an Integer index to a Item struct
    mapping (uint => Item) public items;

    /// @dev ItemAdded event will be issued once a new item has been added
    /// @return event.address is account which initiated the transaction
    /// @return event.length is length of items after transaction
    event ItemAdded(
        address indexed from,
        uint    indexed length
    );


    /// @dev add a new item to the image gallery
    /// @param _url URL to the media file (image or video)
    /// @param _caption Caption text for media item
    /// @dev emits ItemAdded event
    function addItem(string memory _url, string memory _caption) public {
        Item memory item = Item({
            id: itemCount,
            url: _url,
            caption: _caption
        });
        items[itemCount] = item;
        itemCount++;
        emit ItemAdded(msg.sender, itemCount);
    }


    /// @dev retrieve item by index from image gallery
    /// @param index (starting with 0) of item within items
    /// @return url URL to the media file (image or video)
    /// @return caption Caption text for media item
    /// @dev Item struct will be decomposed and the elements will be returned individually
    function getItemByIndex(uint index) public view returns (string memory, string memory) {
        require(index < itemCount, "ERROR: index out of bounds:");
        return(items[index].url, items[index].caption);
    }


    /** EXPERIMENTAL STUFF - ABIEncoderV2 required (web3.js 1.x) */

    /// @dev add a new item to the image gallery
    /// @param item struct to be added to gallery
    /// @dev emits ItemAdded event
    /// @dev Passing structs is only supported in the new experimental ABI encoder - use with care!
    function addItemStruct(Item memory item) public {
        items[itemCount] = item;
        itemCount++;
        emit ItemAdded(msg.sender, itemCount);
    }


    /// @dev retrive item  by index as struct from image gallery
    /// @param index (starting with 0) of item within items
    /// @return Item struct
    /// @dev emits ItemAdded event
    /// @dev Passing structs is only supported in the new experimental ABI encoder - use with care!
    function getItemStructByIndex(uint index) public view returns (Item memory) {
        require(index < itemCount, "ERROR: index out of bounds:");
        return(items[index]);
    }

}
