import mongoose from 'mongoose';

describe('Product CRUD', () => {
	let server;

	beforeAll(async (done) => {
<<<<<<< HEAD
<<<<<<< HEAD
			server = await require('../src/index');
		    done();
=======
		done();
		server = await require('../src/index');
>>>>>>> 2ee97ac (added shit)
=======
			server = await require('../src/index');
		    done();
>>>>>>> 0f95521 (fix sec)
	});

	afterAll(async (done) => {
		server.close();
		await mongoose.connection.close();
		done();
	});

	test('Add Product POST /product', async (done) => {
<<<<<<< HEAD
<<<<<<< HEAD

=======
		server = await require('../src/index');
>>>>>>> 2ee97ac (added shit)
=======

>>>>>>> 0f95521 (fix sec)
		const response = await server.inject({
			method: 'POST',
			url: '/product',
			payload: {
				_id: '5f2678dff22e1f4a3c0782ee',
				name: 'JBL Headphone',
				category: 'Electronic appliances',
				unit: 1
			}
		});
		expect(response.statusCode).toBe(201);
		done();
	});

	test('Get All Product /product', async (done) => {
		const response = await server.inject({
			method: 'GET',
			url: '/product'
		});
		expect(response.statusCode).toBe(200);
		done();
	});

	test('Update Product PUT /product/:id', async (done) => {
		const response = await server.inject({
			method: 'PUT',
			url: '/product/5f2678dff22e1f4a3c0782ee',
			payload: {
				unit: 2
			}
		});
		expect(response.statusCode).toBe(200);
		done();
	});

	test('Get one Product GET /product/:id', async (done) => {
		const response = await server.inject({
			method: 'GET',
			url: '/product/5f2678dff22e1f4a3c0782ee'
		});
		expect(response.statusCode).toBe(200);
		done();
	});

	test('Delete one Product DELETE /product/:id', async (done) => {
		const response = await server.inject({
			method: 'DELETE',
			url: '/product/5f2678dff22e1f4a3c0782ee'
		});
		expect(response.statusCode).toBe(200);
		done();
	});

	test('Health Route', async (done) => {
		const response = await server.inject({
			method: 'GET',
			url: '/health'
		});
		expect(response.statusCode).toBe(200);
		done();
	});

<<<<<<< HEAD
<<<<<<< HEAD
});
=======
});
>>>>>>> 2ee97ac (added shit)
=======
});
>>>>>>> 0f95521 (fix sec)
