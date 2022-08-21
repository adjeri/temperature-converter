import request from 'supertest';

const baseUrl = 'http://localhost:3000/api';
const commonHeaders = { "Content-Type": "application/json" };

describe('convert endpoint', () => {
    it('should return 422 when the content type header is not application/json', async () => {
        const response = await request(baseUrl).get('/convert-temperature');
        expect(response.status).toEqual(422);
        expect(JSON.stringify(response.body)).toContain('Content-Type header is required');
    });

    it('should return 422 when the content type header is not application/json', async () => {
        const response = await request(baseUrl)
            .get('/convert-temperature')
            .set({ "Content-Type": "blabla" })
            .query({ value: 12, from: 'celsius', to: 'fahrenheit' });
        expect(response.status).toEqual(422);
        expect(response.body).toMatchObject({
            "type": "error",
            "status": 422,
            "message": "Invalid input",
            "errors": [
                {
                    "value": "blabla",
                    "msg": "Content-Type header must be application/json",
                    "param": "content-type",
                    "location": "headers"
                }
            ]
        });
    });

    it('should return 422 when value is not a number', async () => {
        const response = await request(baseUrl)
            .get('/convert-temperature')
            .set({ "Content-Type": "application/json" })
            .query({ value: 'd', from: 'celsius', to: 'fahrenheit' });
        expect(response.status).toEqual(422);
        expect(response.body).toMatchObject({
            "type": "error",
            "status": 422,
            "message": "Invalid input",
            "errors": [
                {
                    "value": "d",
                    "msg": "value must be a number",
                    "param": "value",
                    "location": "query"
                }
            ]
        });
    });

    it('should return 422 when from is different from celsius and fahrenheit', async () => {
        const response = await request(baseUrl)
            .get('/convert-temperature')
            .set({ "Content-Type": "application/json" })
            .query({ value: 33, from: 'celsiusd', to: 'fahrenheit' });
        expect(response.status).toEqual(422);
        expect(response.body).toMatchObject({
            "type": "error",
            "status": 422,
            "message": "Invalid input",
            "errors": [
                {
                    "value": "celsiusd",
                    "msg": "from must be one of the following: celsius, fahrenheit",
                    "param": "from",
                    "location": "query"
                }
            ]
        });
    });

    it('should return 422 when to is different from celsius and fahrenheit', async () => {
        const response = await request(baseUrl)
            .get('/convert-temperature')
            .set({ "Content-Type": "application/json" })
            .query({ value: 33, from: 'celsius', to: 'fahrenheitd' });
        expect(response.status).toEqual(422);
        expect(response.body).toMatchObject({
            "type": "error",
            "status": 422,
            "message": "Invalid input",
            "errors": [
                {
                    "value": "fahrenheitd",
                    "msg": "to must be one of the following: celsius, fahrenheit",
                    "param": "to",
                    "location": "query"
                }
            ]
        });
    });

    it('should return 422 when to and from are same', async () => {
        const response = await request(baseUrl)
            .get('/convert-temperature')
            .set({ "Content-Type": "application/json" })
            .query({ value: 33, from: 'celsius', to: 'celsius' });
        expect(response.status).toEqual(422);
        expect(response.body).toMatchObject({
            "type": "error",
            "status": 422,
            "message": "Invalid input",
            "errors": [
                {
                    "value": "celsius",
                    "msg": "to must be different from celsius",
                    "param": "to",
                    "location": "query"
                }
            ]
        });
    });

    it('should return 422 when decimal is less than 0', async () => {
        const response = await request(baseUrl)
            .get('/convert-temperature')
            .set({ "Content-Type": "application/json" })
            .query({ value: 33, from: 'celsius', to: 'fahrenheit', decimal: -1 });
        expect(response.status).toEqual(422);
        expect(response.body).toMatchObject({
            "type": "error",
            "status": 422,
            "message": "Invalid input",
            "errors": [
                {
                    "value": "-1",
                    "msg": "decimal must be between 0 and 100",
                    "param": "decimal",
                    "location": "query"
                }
            ]
        });
    });

    it('should return 422 when decimal is more than 100', async () => {
        const response = await request(baseUrl)
            .get('/convert-temperature')
            .set({ "Content-Type": "application/json" })
            .query({ value: 33, from: 'celsius', to: 'fahrenheit', decimal: 200 });
        expect(response.status).toEqual(422);
        expect(response.body).toMatchObject({
            "type": "error",
            "status": 422,
            "message": "Invalid input",
            "errors": [
                {
                    "value": "200",
                    "msg": "decimal must be between 0 and 100",
                    "param": "decimal",
                    "location": "query"
                }
            ]
        });
    });

    it('should return 200 with correct inputs', async () => {
        const response = await request(baseUrl)
            .get('/convert-temperature')
            .set(commonHeaders)
            .query({ value: 12, from: 'celsius', to: 'fahrenheit' });
        expect(response.status).toEqual(200);
        expect(response.body).toEqual({
            "from": "Celsius",
            "to": "Fahrenheit",
            "decimal": 0,
            "value": 12,
            "result": 54,
            "resultRaw": "54°F"
        });
    });
});