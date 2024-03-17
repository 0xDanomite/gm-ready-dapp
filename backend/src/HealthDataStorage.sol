// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract HealthDataStorage {
    // Define a struct to hold the health data in the desired format
    struct HealthData {
        string date; // YYYY-MM-DD format
        string ouraHealthDataBlob; // Assume this is a JSON string or similar
        uint256 readinessScore;
    }

    // Mapping from user address to their health data
    // Note: move this offchain in the future
    mapping(address => mapping(string => HealthData)) public healthDataRecords;

    // Function to allow users to submit their health data
    function storeHealthData(string memory _date, string memory _ouraHealthDataBlob, uint256 _readinessScore) public {
        // Create the HealthData struct
        HealthData memory newData = HealthData({
            date: _date,
            ouraHealthDataBlob: _ouraHealthDataBlob,
            readinessScore: _readinessScore
        });

        // Store the data in the mapping
        healthDataRecords[msg.sender][_date] = newData;
    }

    // Function to retrieve health data for a specific user and date
    // Note: optional as public mappings generate a getter automatically
    function getHealthData(address _user, string memory _date) public view returns (HealthData memory) {
        return healthDataRecords[_user][_date];
    }

   // Function to retrieve readiness score data for a specific user and date
    function getReadinessScore(address _user, string memory _date) public view returns (uint256) {
      return healthDataRecords[_user][_date].readinessScore;
    }
}
