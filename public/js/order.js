const addSandwichToOrderHandler = async (event) => {
    event.preventDefault();

    await getOrder();

    // Add item to order
    const sandwichID = event.target.id.slice(9);
    
    if (sandwichID) {
        const response = await fetch(`/api/orders/add/sandwich/${sandwichID}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        });
    
        if (!response.ok) { alert(response.statusText); }
        
    }
};
  
const addSideItemToOrderHandler = async (event) => {
    event.preventDefault();

    await getOrder();

    // Add item to order
    const sideItemID = event.target.id.slice(9);
    if (sideItemID) {
        const response = await fetch(`/api/orders/add/sideitem/${sideItemID}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        });
        if (!response.ok) { alert(response.statusText); }
        
    }
};

const getOrder = async () => {
    // Create a new order (or use existing order)
    console.log("01");
    const response = await fetch(`/api/orders/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    });
    console.log("02");
    if (!response.ok) { alert(response.statusText); }
}

document
    .querySelector('.sandwiches')
    .addEventListener('click', addSandwichToOrderHandler);
  
document
    .querySelector('.sideItems')
    .addEventListener('click', addSideItemToOrderHandler);