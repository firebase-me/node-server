import { Router, Request, Response } from 'express';

const itemsRouter = Router();

// let items: { id: number; name: string }[] = [];

itemsRouter.post('/', (_req: Request, _res: Response) => {
    // Implementation for creating a new item
});

itemsRouter.get('/', (_req: Request, _res: Response) => {
    // Implementation for getting all items
});

itemsRouter.get('/:id', (_req: Request, _res: Response) => {
    // Implementation for getting a specific item by ID
});

itemsRouter.put('/:id', (_req: Request, _res: Response) => {
    // Implementation for updating an item by ID
});

itemsRouter.delete('/:id', (_req: Request, _res: Response) => {
    // Implementation for deleting an item by ID
});

export default itemsRouter;
