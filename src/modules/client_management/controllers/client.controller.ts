import { Request, Response } from "express";
import { clientService } from "../services/client.service";

class ClientController {
    async createClient(req: Request, res: Response) {
        try {
            const client = await clientService.createClient(req.body);
            return res.status(201).json({
                message: "Client created successfully",
                data: client,
            });
        } catch (error: any) {
            return res.status(error?.statusCode || 400).json({
                message: error?.message || "Failed to create client",
                error: true,
            });
        }
    }

    async getClients(req: Request, res: Response) {
        try {
            const clients = await clientService.getClients();
            return res.status(200).json({
                message: "Success",
                data: clients,
            });
        } catch (error: any) {
            return res.status(error?.statusCode || 500).json({
                message: error?.message || "Failed to fetch clients",
                error: true,
            });
        }
    }

    async getClientById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const client = await clientService.getClientById(id);
            return res.status(200).json({
                message: "Success",
                data: client,
            });
        } catch (error: any) {
            return res.status(error?.statusCode || 500).json({
                message: error?.message || "Failed to fetch client",
                error: true,
            });
        }
    }

    async updateClient(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const client = await clientService.updateClient(id, req.body);
            return res.status(200).json({
                message: "Client updated successfully",
                data: client,
            });
        } catch (error: any) {
            return res.status(error?.statusCode || 400).json({
                message: error?.message || "Failed to update client",
                error: true,
            });
        }
    }

    async deleteClient(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const client = await clientService.deleteClient(id);
            return res.status(200).json({
                message: "Client deleted successfully",
                data: client,
            });
        } catch (error: any) {
            return res.status(error?.statusCode || 400).json({
                message: error?.message || "Failed to delete client",
                error: true,
            });
        }
    }
}

export const clientController = new ClientController();
