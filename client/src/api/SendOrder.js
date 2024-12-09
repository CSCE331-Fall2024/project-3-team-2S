const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export async function SendOrder(orders) {
  try {
    const ordersWithFoodIds = orders
      .filter(order => !order.menuItemType.endsWith("Promo")) // Filter out promo items
      .map(order => {
        let foodid1 = null, foodid2 = null, foodid3 = null, foodid4 = null;
        
        switch (order.menuItemType) {
          case "Bowl":
            foodid1 = order.side || null;
            foodid2 = order.entrees[0] || null;
            break;
          case "Plate":
            foodid1 = order.side || null;
            foodid2 = order.entrees[0] || null;
            foodid3 = order.entrees[1] || null;
            break;
          case "Bigger Plate":
            foodid1 = order.side || null;
            foodid2 = order.entrees[0] || null;
            foodid3 = order.entrees[1] || null;
            foodid4 = order.entrees[2] || null;
            break;
          case "A La Carte":
            foodid1 = order.alacarte || null;
            break;
          case "Appetizer":
            foodid1 = order.appetizer || null;
            break;
          case "Drink":
            foodid1 = order.drink || null;
            break;
          default:
            throw new Error('Invalid menu item type');
        }
        console.log("is rewards? " + order.rewards);
        if(order.rewards) { //TODO check rewards
          order.price = -1 * order.price;
        }

        return {
          price: order.price,
          name: order.menuItemType,
          foodid1,
          foodid2,
          foodid3,
          foodid4
        };
      });

    // Add customer and employee info
    let tempEmployeeId = localStorage.getItem("employeeId");
    if(tempEmployeeId === null) {
      tempEmployeeId = "1";
    }
    let tempCustomerId = localStorage.getItem("customerId");
    if(tempCustomerId === null) {
      tempCustomerId = "1";
    }
    console.log("customer id is " + tempCustomerId);
    ordersWithFoodIds.push({
      customerid: tempCustomerId,
      employeeid: tempEmployeeId,
    });

    // Send the order
    const postResponse = await fetch(`${API_BASE_URL}/send-order`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(ordersWithFoodIds),
    });

    if (!postResponse.ok) {
      throw new Error('Failed to send order');
    }

    console.log('Order sent successfully!');
    return await postResponse.json();

  } catch (error) {
    console.error('Error sending order:', error);
    throw error;
  }
}
