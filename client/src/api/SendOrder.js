const API_BASE_URL = 'https://project-3-team-2-s-dep-server.vercel.app/api';

export async function SendOrder(orders) {
  try {
    const ordersWithFoodIds = orders.map(order => {
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

      return {
        price: order.price,
        name: order.menuItemType,
        foodid1,
        foodid2,
        foodid3,
        foodid4
      };
    });

    // Last element in ordersWithFoodIds will contain data about customerid and employeeid
    ordersWithFoodIds.push({
      customerid: 1,
      employeeid: 1
    });

    console.log(ordersWithFoodIds);

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
