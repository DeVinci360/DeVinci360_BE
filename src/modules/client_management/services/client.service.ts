import { clientRepository } from "../repositories/client.repository";
import { AppError } from "../../../common/errors/app.error";
import { validateId } from "../../organization_and_policy/utils";

class ClientService {
    private formatClient(client: any) {
        if (!client) return null;
        const formatted = { ...client };
        if (formatted._id) formatted._id = formatted._id.toString();
        return formatted;
    }

    async createClient(data: any) {
        const existingName = await clientRepository.isCompanyNameExists(data.companyName);
        if (existingName) {
            throw new AppError("Company name already exists", 400);
        }

        return await clientRepository.create(data);
    }

    async getClients() {
        const clients = await clientRepository.list();
        return clients.map(c => this.formatClient(c));
    }

    async getClientById(id: string) {
        validateId(id, "Invalid client ID");
        const client = await clientRepository.findById(id);
        if (!client) {
            throw new AppError("Client not found", 404);
        }
        return this.formatClient(client);
    }

    async updateClient(id: string, data: any) {
        validateId(id, "Invalid client ID");

        if (data.companyName) {
            const existingName = await clientRepository.isCompanyNameExists(data.companyName);
            if (existingName && existingName._id.toString() !== id) {
                throw new AppError("Company name already exists", 400);
            }
        }

        return await clientRepository.update(id, data);
    }

    async deleteClient(id: string) {
        validateId(id, "Invalid client ID");
        return await clientRepository.delete(id);
    }
}

export const clientService = new ClientService();
