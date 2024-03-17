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
        uint256 testReadinessScore = 85; // Example readiness score
        // Store health data
        healthDataStorage.storeHealthData(testDate, testDataBlob, testReadinessScore);

        // Retrieve the stored data
        HealthDataStorage.HealthData memory retrievedData = healthDataStorage.getHealthData(address(this), testDate);

        // Validate the stored data
        assertEq(retrievedData.date, testDate);
        assertEq(retrievedData.ouraHealthDataBlob, testDataBlob);
                assertEq(retrievedData.readinessScore, testReadinessScore);
    }
       function testGetReadinessScore() public {
        // Setup test data
        string memory testDate = "2024-03-16"; // Adjusted to YYYY-MM-DD format to match struct
        uint256 testReadinessScore = 85; // Example readiness score

        // Store health data
        healthDataStorage.storeHealthData(testDate, "{\"data\":\"example\"}", testReadinessScore);

        // Retrieve only the readiness score
        uint256 retrievedScore = healthDataStorage.getReadinessScore(address(this), testDate);

        // Validate the retrieved readiness score
        assertEq(retrievedScore, testReadinessScore);
    }
}
