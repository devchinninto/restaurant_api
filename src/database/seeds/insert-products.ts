import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    await knex("products").del();

    await knex("products").insert([
        { name: "Executivo de Frango Grelhado", price: 25.00 },
        { name: "Bowl de Carne Moída com Batata", price: 28.50 },
        { name: "Omelete Completo com Queijo", price: 18.00 },
        { name: "Tapioca de Frango com Requeijão", price: 16.00 },
        { name: "Risoto de Camarão", price: 42.00 },
        { name: "Hamburguer Artesanal (Blend da Casa)", price: 32.00 },
        { name: "Stroganoff de Carne", price: 30.00 },
        { name: "Salada Caesar com Frango", price: 24.00 },
        { name: "Macarrão à Bolonhesa", price: 26.00 },
        { name: "Porção de Batata Frita", price: 15.00 },
        { name: "Salada de Legumes no Vapor", price: 12.00 },
        { name: "Coca-Cola Zero (Lata)", price: 6.00 },
        { name: "Suco Natural", price: 8.50 },
        { name: "Água Mineral sem Gás", price: 4.00 },
        { name: "Café Expresso Duplo", price: 5.00 },
        { name: "Chá Gelado de Limão", price: 7.00 },
        { name: "Energy Drink (Lata)", price: 12.00 },
        { name: "Pudim de Leite Condensado", price: 10.00 },
        { name: "Mousse de Chocolate Meio Amargo", price: 12.00 },
        { name: "Salada de Frutas", price: 9.00 }
    ]);
};
