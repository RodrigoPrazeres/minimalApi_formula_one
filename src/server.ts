import fastify from "fastify";
import { request } from "http";
import cors from "@fastify/cors"



const server = fastify({ logger: true });

server.register(cors, {
    origin: "*",
});

const teams =
    [
        { id: 1, name: "McLaren", base: "Woking, United Kingdom" },
        { id: 2, name: "Mercedes", base: "Brackley, United Kingdom" },
        { id: 3, name: "Red Bull Racing", base: "Milton Keynes, United Kingdom" },
        { id: 4, name: "Ferrari", base: "Maranello, Italy" },
        { id: 5, name: "Alpine", base: "Enstone, United Kingdom" },
        { id: 6, name: "Aston Martin", base: "Silverstone, United Kingdom" },
        { id: 7, name: "AlphaTauri", base: "Faenza, Italy" },
        { id: 8, name: "Williams", base: "Grove, United Kingdom" },
        { id: 9, name: "Alfa Romeo", base: "Hinwil, Switzerland" },
        { id: 10, name: "Haas", base: "Kannapolis, United States" }
    ];

const drivers =
    [
        { id: 1, name: "Max Verstappen", team: "Red Bull Racing" },
        { id: 2, name: "Lewis Hamilton", team: "Mercedes" },
        { id: 3, name: "Lando Norris", team: "McLaren" },
        { id: 4, name: "Charles Leclerc", team: "Ferrari" },
        { id: 5, name: "Carlos Sainz", team: "Ferrari" },
        { id: 6, name: "Sergio Perez", team: "Red Bull Racing" },
        { id: 7, name: "George Russell", team: "Mercedes" },
        { id: 8, name: "Esteban Ocon", team: "Alpine" },
        { id: 9, name: "Pierre Gasly", team: "Alpine" },
        { id: 10, name: "Fernando Alonso", team: "Aston Martin" },
        { id: 11, name: "Lance Stroll", team: "Aston Martin" },
        { id: 12, name: "Yuki Tsunoda", team: "AlphaTauri" },
        { id: 13, name: "Nyck de Vries", team: "AlphaTauri" },
        { id: 14, name: "Alex Albon", team: "Williams" },
        { id: 15, name: "Logan Sargeant", team: "Williams" },
        { id: 16, name: "Valtteri Bottas", team: "Alfa Romeo" },
        { id: 17, name: "Guanyu Zhou", team: "Alfa Romeo" },
        { id: 18, name: "Kevin Magnussen", team: "Haas" },
        { id: 19, name: "Nico Hulkenberg", team: "Haas" }
    ];

server.get("/teams", async (request, response) => {
    response.type("application/json").code(200);

    return { teams };
});

server.get("/drivers", async (request, response) => {
    response.type("application/json").code(200);
    return { drivers };
});

interface driverParams {
    id: string;
};

server.get<{ Params: driverParams }>
    ("/drivers/:id", async (request, response) => {
        const id = parseInt(request.params.id);
        const driver = drivers.find(d => d.id === id)

        if (!driver) {
            response.type("application/json").code(404);
            return { message: "Driver not found" }
        } else {
            response.type("application/json").code(200);
            return { driver };

        }
    }
    );

server.listen({ port: 3333 }, () => {
    console.log("server init");
});