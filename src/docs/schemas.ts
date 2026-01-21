// src/docs/schemas.ts

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - name
 *         - price
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the product
 *         name:
 *           type: string
 *           description: Product name
 *         price:
 *           type: number
 *           format: float
 *           description: Product price
 *         created_at:
 *           type: string
 *           format: date-time
 *         updated_at:
 *           type: string
 *           format: date-time
 *       example:
 *         id: 1
 *         name: "Porção de Batatas"
 *         price: 45.90
 *         created_at: "2024-07-21T18:30:00Z"
 *         updated_at: "2024-07-21T18:30:00Z"
 *
 *     Table:
 *       type: object
 *       required:
 *         - table_number
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the table
 *         table_number:
 *           type: integer
 *           description: The physical number of the table in the restaurant
 *         created_at:
 *           type: string
 *           format: date-time
 *         updated_at:
 *           type: string
 *           format: date-time
 *       example:
 *         id: 1
 *         table_number: 10
 *         created_at: "2024-01-15T10:00:00Z"
 *         updated_at: "2024-01-15T10:00:00Z"
 *
 *     TableSession:
 *       type: object
 *       required:
 *         - table_id
 *       properties:
 *         id:
 *           type: integer
 *           description: The session ID
 *         table_id:
 *           type: integer
 *           description: Reference to the Table ID
 *         opened_at:
 *           type: string
 *           format: date-time
 *           description: When the table was occupied
 *         closed_at:
 *           type: string
 *           format: date-time
 *           nullable: true
 *           description: When the table was freed (null if currently open)
 *       example:
 *         id: 42
 *         table_id: 10
 *         opened_at: "2024-07-21T19:00:00Z"
 *         closed_at: null
 *
 *     Order:
 *       type: object
 *       required:
 *         - table_session_id
 *         - product_id
 *         - quantity
 *         - price
 *       properties:
 *         id:
 *           type: integer
 *           description: Order ID
 *         table_session_id:
 *           type: integer
 *           description: Reference to the active Table Session
 *         product_id:
 *           type: integer
 *           description: Reference to the Product
 *         quantity:
 *           type: integer
 *           description: Amount of items ordered
 *         price:
 *           type: number
 *           format: float
 *           description: Historical price at the moment of the order
 *         created_at:
 *           type: string
 *           format: date-time
 *         updated_at:
 *           type: string
 *           format: date-time
 *       example:
 *         id: 123
 *         table_session_id: 42
 *         product_id: 1
 *         quantity: 2
 *         price: 91.80
 *         created_at: "2024-07-21T19:15:00Z"
 *         updated_at: "2024-07-21T19:15:00Z"
 */