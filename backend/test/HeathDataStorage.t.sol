// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "../src/HealthDataStorage.sol";

contract HealthDataStorageTest is Test {
    HealthDataStorage healthDataStorage;

    function setUp() public {
        healthDataStorage = new HealthDataStorage();
    }

    function testStoreAndRetrieveHealthData() public {
        // Setup test data
        string memory testDate = "03/16/2024";
        string memory testDataBlob = "{\"data\":\"example\"}";

        // Store health data
        healthDataStorage.storeHealthData(testDate, testDataBlob);

        // Retrieve the stored data
        HealthDataStorage.HealthData memory retrievedData = healthDataStorage.getHealthData(address(this), testDate);

        // Validate the stored data
        assertEq(retrievedData.date, testDate);
        assertEq(retrievedData.ouraHealthDataBlob, testDataBlob);
    }
}
