import { server } from "../src/server"
import Prisma from "../src/db";
import { FastifyInstance } from "fastify";

describe("server test", () => {
  let instance: FastifyInstance;
  let id: string;

  beforeAll(async () => {
    instance = server;
    await instance.ready();
  })

  afterAll(async () => {
    await instance.close();
  })

  it('GET /get/ returns all entries', async () => {
    const response = await instance.inject({
      method: 'GET',
      url: '/get/',
    });

    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.payload)).toBeInstanceOf(Array);
  })

  test('POST /create/ creates a new entry', async () => {
    const newEntry = { title: "Create Test", description: "test desctiption", created_at: new Date(), scheduled: new Date() };

    const response = await instance.inject({
      method: 'POST',
      url: '/create/',
      payload: newEntry,
    });

    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.payload)).toHaveProperty('id');
    id = JSON.parse(response.payload).id;
  });

  test('GET /get/:id returns a specific entry', async () => {
    const entryId = id;

    const response = await instance.inject({
      method: 'GET',
      url: `/get/${entryId}`,
    });

    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.payload)).toHaveProperty('id', entryId);
  });

  test('PUT /update/:id updates an entry', async () => {
    const entryIdToUpdate = id;
    const updatedEntry = { title: "Update Test", description: "test desctiption", created_at: new Date(), scheduled: new Date() }

    const response = await instance.inject({
      method: 'PUT',
      url: `/update/${entryIdToUpdate}`,
      payload: updatedEntry,
    });

    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.payload)).toHaveProperty('msg', 'Updated successfully');
  });

  test('DELETE /delete/:id deletes an entry', async () => {
    const entryIdToDelete = id;

    const response = await instance.inject({
      method: 'DELETE',
      url: `/delete/${entryIdToDelete}`,
    });

    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.payload)).toHaveProperty('msg', 'Deleted successfully');
  });

  
});