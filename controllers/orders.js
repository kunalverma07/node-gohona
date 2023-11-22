const truncate = require("../functions/dateFormat");
const Order = require("../models/orders");
const transporter = require("../utils/emailConfig"); // Import the Nodemailer transporter

// Create a new order and send a responsive email notification
exports.createOrder = async (req, res) => {
  try {
    const order = new Order(req.body);
    const savedOrder = await order.save();

    // Calculate the subtotal
    const subtotal = savedOrder.ProductData.reduce((total, product) => {
      return total + product.price * product.quantity;
    }, 0);

    const logoUrl = "https://srimatreyfoods.com/assets/images/logo.png"; // URL of the logo image

    const emailContent = `
      <html>
        <head>
          <style>
            body {
              margin: 0;
              padding: 0;
              background-color: #f8f8f8; /* Lighter background color */
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
            }
            .email-wrap {
              background-color: #f5f5f5; /* Light gray background */
              color: #333; /* Dark text color */
       
              border-radius: 10px;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
              padding: 20px;
            }
            .email-wrapper {
              color: #333; /* Dark text color */
              display: flex;
       

            }
            .logo {
              text-align: center;
              margin-bottom: 20px;
            }
            .logo img {
              max-width: 150px; /* Adjust the max-width to make the logo smaller */
            }
            .billing-address{
              margin-bottom: 7px; /* Increase spacing between sections */
              padding: 7px;
              box-sizing: border-box;
          
            }
            .order-summary {
              margin-bottom: 7px; /* Increase spacing between sections */
              padding: 7px;
              box-sizing: border-box;
            }


            h2, h3 {
              font-size: 18px; /* Smaller font size */
              color: #333;
            }
            .subtotal {
              padding: 10px;
            }
            .order-details {
              text-align: center; /* Center-align product details */
            }

            @media screen and (max-width: 600px) {
              .email-wrapper {
                flex-direction: column;
              }
              .billing-address, .order-summary {
                padding: 10px;
              }
            }
          </style>
        </head>
        <body>
          <div class="container">
          <div class="logo">
          <img src="${logoUrl}" alt="Logo" />
            </div>
            <div class="email-wrap">
            <div class="email-wrapper">


              <div class="billing-address">
                  <h2>Billing Address</h2>
                  <p><strong>Name:</strong> ${req.body.userName}</p>
                  <p><strong>Address:</strong> 123 Main Street</p>
                  <p><strong>Phone:</strong> ${req.body.phoneNumber}</p>
                  <p><strong>Email:</strong> ${req.body.email}</p>
              </div>

              <div class="order-summary">
                <h2>Order Summary</h2>
                <p><strong>Order ID:</strong> #SriMatFood/${truncate(
                  savedOrder.createdAt,
                  11
                )}/${savedOrder._id.toString().slice(0, 6)}

                <h3>Order Details:</h3>
                <table style="width: 100%; border-collapse: collapse;">
                  <thead style="background-color: #333; color: #fff;">
                    <tr>
                      <th style="padding: 10px;">Sl No</th>
                      <th style="padding: 10px;">Product Name</th>
                      <th style="padding: 10px;">Quantity</th>
                      <th style="padding: 10px;">Price</th>
                    </tr>
                  </thead>
                  <tbody class="order-details">
                    ${savedOrder.ProductData.map(
                      (product, index) => `
                        <tr>
                          <td style="padding: 10px;">${index + 1}</td>
                          <td style="padding: 10px;">${product.productName}</td>
                          <td style="padding: 10px;">${product.quantity}</td>
                          <td style="padding: 10px;">${product.price.toFixed(
                            2
                          )}</td>
                        </tr>
                      `
                    ).join("")}
                  </tbody>
                </table>
                <div class="subtotal">
                  <p style="text-align: right;"><strong>Subtotal:</strong> ₹${subtotal.toFixed(
                    2
                  )}</p>
                </div>
              </div>
            </div>
            <span>Copyright ©SriMatreyFoods.com</span>
            </div>
          </div>
        </body>
      </html>
    `;

    const mailOptions = {
      from: "sahu99516@gmail.com",
      to: [req.body.email, "sumitsince2000@gmail.com"],
      subject: "New Order Notification",
      html: emailContent,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
