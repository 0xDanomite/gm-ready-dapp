export const checkAddressInLocalStorage = (address) => {
  try {
    // Retrieve the data from localStorage
    const json = localStorage.getItem('oura-readiness');

    // Parse the JSON string back to an object
    const data = JSON.parse(json);

    // Check if the data is not null and has the 'address' property
    if (data && data[address]) {
      console.log(`Address ${address} found in localStorage:`, data[address]);
      return true; // Address exists in localStorage
    } else {
      console.log(`Address ${address} not found in localStorage`);
      return false; // Address does not exist in localStorage
    }
  } catch (error) {
    console.error('Error checking address in localStorage:', error);
    return false; // Error occurred while checking address
  }
};

export const addAddressToLocalStorage = (address) => {
  try {
    // Retrieve the data from localStorage
    let data = JSON.parse(localStorage.getItem('oura-readiness'));

    // Check if the data is null or undefined, and initialize it if necessary
    if (!data) {
      data = {};
    }

    // Check if the address already exists in localStorage
    if (data[address]) {
      console.log(`Address ${address} already exists in localStorage`);
      return;
    }

    // Create the initial value for the address
    const initialValue = { ouraKey: null, ensName: null };

    // Set the address with the initial value
    data[address] = initialValue;

    // Convert the data object to a JSON string
    const json = JSON.stringify(data);

    // Add the updated data to localStorage
    localStorage.setItem('oura-readiness', json);

    console.log(
      `Address ${address} added to localStorage with initial value:`,
      initialValue
    );
  } catch (error) {
    console.error('Error adding address to localStorage:', error);
  }
};

export const checkOuraKeyInLocalStorage = (address) => {
  try {
    // Retrieve the data from localStorage
    const json = localStorage.getItem('oura-readiness');

    // Parse the JSON string back to an object
    const data = JSON.parse(json);

    // Check if the data is not null and has the 'address' property
    if (data && data[address] && data[address].ouraKey) {
      console.log(
        `OuraKey found for address ${address} in localStorage:`,
        data[address].ouraKey
      );
      return true; // OuraKey exists for the address in localStorage
    } else {
      console.log(`OuraKey not found for address ${address} in localStorage`);
      return false; // OuraKey does not exist for the address in localStorage
    }
  } catch (error) {
    console.error('Error checking OuraKey in localStorage:', error);
    return false; // Error occurred while checking OuraKey
  }
};

export const getOuraKeyFromLocalStorage = (address) => {
  try {
    // Retrieve the data from localStorage
    const json = localStorage.getItem('oura-readiness');

    // Parse the JSON string back to an object
    const data = JSON.parse(json);

    // Check if the data is not null and has the 'address' property and ouraKey is not null
    if (data && data[address] && data[address].ouraKey !== null) {
      console.log(
        `OuraKey found for address ${address} in localStorage:`,
        data[address].ouraKey
      );
      return data[address].ouraKey; // Return OuraKey if exists for the address in localStorage
    } else {
      console.log(`OuraKey not found for address ${address} in localStorage`);
      return null; // Return null if OuraKey does not exist for the address in localStorage
    }
  } catch (error) {
    console.error('Error getting OuraKey from localStorage:', error);
    return null; // Return null if error occurred while getting OuraKey
  }
};

export const updateOuraKeyInLocalStorage = (address, newOuraKey) => {
  try {
    // Retrieve the data from localStorage
    let data = JSON.parse(localStorage.getItem('oura-readiness'));

    // Check if the data is null or undefined, and initialize it if necessary
    if (!data) {
      data = {};
    }

    // Check if the address already exists in localStorage
    if (!data[address]) {
      console.log(
        `Address ${address} does not exist in localStorage. Cannot update OuraKey.`
      );
      return;
    }

    // Update the OuraKey for the address
    data[address].ouraKey = newOuraKey;

    // Convert the updated data object to a JSON string
    const json = JSON.stringify(data);

    // Update the data in localStorage
    localStorage.setItem('oura-readiness', json);

    console.log(
      `OuraKey updated for address ${address} in localStorage:`,
      newOuraKey
    );
  } catch (error) {
    console.error('Error updating OuraKey in localStorage:', error);
  }
};
