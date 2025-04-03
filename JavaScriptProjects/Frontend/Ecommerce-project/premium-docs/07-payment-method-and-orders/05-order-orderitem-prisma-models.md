# Order & OrderItem Models

Our checkout process is looking good. Now we need to create the page where the user can place the order. Before we do that though, we need to setup our database to handle orders. This means creating a new model and table for orders and order items.

## Create Order Schema

We need a new schema and table for orders. Open the `schema.prisma` file and add the following:

```prisma
model Order {
  id              String      @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  userId          String      @db.Uuid
  shippingAddress Json        @db.Json
  paymentMethod   String
  paymentResult   Json?       @db.Json
  itemsPrice      Decimal     @db.Decimal(12, 2)
  shippingPrice   Decimal     @db.Decimal(12, 2)
  taxPrice        Decimal     @db.Decimal(12, 2)
  totalPrice      Decimal     @db.Decimal(12, 2)
  isPaid          Boolean     @default(false)
  paidAt          DateTime?   @db.Timestamp(6)
  isDelivered     Boolean     @default(false)
  deliveredAt     DateTime?   @db.Timestamp(6)
  createdAt       DateTime    @default(now()) @db.Timestamp(6)
  user            User        @relation(fields: [userId], references: [id], onDelete: Cascade, onUpdate: NoAction, map: "order_userId_user_id_fk")
  orderItems      OrderItem[]
}
```

Here is a rundown of the fields:

- `id`: A unique identifier for the order.
- `userId`: The ID of the user who placed the order.
- `shippingAddress`: The shipping address for the order.
- `paymentMethod`: The payment method used for the order.
- `paymentResult`: The result of the payment.
- `itemsPrice`: The price of the items in the order.
- `shippingPrice`: The price of the
- `taxPrice`: The price of the tax for the order.
- `totalPrice`: The total price of the order.
- `isPaid`: Whether the order has been paid for.
- `paidAt`: The date and time the order was paid for.
- `isDelivered`: Whether the order has been delivered.
- `deliveredAt`: The date and time the order was delivered.
- `createdAt`: The date and time the order was created.
- `user`: The user who placed the order. This is a one-to-many relationship. We create a foreign key constraint on the `userId` field and name it `order_userId_user_id_fk`.
- `orderItems`: This is an array of order items. We will create the `OrderItem` model next.

Since we added a relationship with the user model, we need to add the following to the user model:

```prisma
model User {
  //...
  Order         Order[]
}
```

Add the following to the `schema.prisma` file:

```prisma
model OrderItem {
  orderId   String  @db.Uuid
  productId String  @db.Uuid
  qty       Int
  price     Decimal @db.Decimal(12, 2)
  name      String
  slug      String
  image     String
  order     Order   @relation(fields: [orderId], references: [id], onDelete: Cascade, onUpdate: NoAction, map: "orderItems_orderId_order_id_fk")
  product   Product @relation(fields: [productId], references: [id], onDelete: Cascade, onUpdate: NoAction, map: "orderItems_productId_product_id_fk")
  @@id([orderId, productId], map: "orderItems_orderId_productId_pk")
}
```

Since we added a relationship with the product model, we need to add the following to the product model:

```prisma
model Product {
  //...
  OrderItem       OrderItem[]
}
```

Here is a rundown of the fields:

- `orderId`: The ID of the order the item belongs to.
- `productId`: The ID of the product the item belongs to.
- `qty`: The quantity of the item.
- `price`: The price of the item.
- `name`: The name of the item.
- `slug`: The slug of the item.
- `image`: The image of the item.
- `order`: The order the item belongs to. This is a one-to-many relationship. We create a foreign key constraint on the `orderId` field and name it `orderItems_orderId_order_id_fk`.
- `product`: The product the item belongs to. This is a one-to-many relationship. We create a foreign key constraint on the `productId` field and name it `orderItems_productId_product_id_fk`.
- `@@id([orderId, productId], map: "orderItems_orderId_productId_pk")`: This is a composite primary key. We create a composite primary key on the `orderId` and `productId` fields. We name it `orderItems_orderId_productId_pk`.

## Migrate & Generate

Now that our models/schemas are setup, we need to migrate and generate the database.

Stop the server if it is running. Also stop Prisma Studio if it is running.

Run the following commands:

```bash
npx prisma migrate dev --name add-order
npx prisma generate
```

Now run the server and Studio. If you open up Studio you should see the new `Order` and `OrderItem` tables.

