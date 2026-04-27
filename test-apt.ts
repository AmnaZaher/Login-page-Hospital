import { listAppointments } from './src/api/appointments';

async function test() {
    try {
        const aptRes = await listAppointments({ PageSize: 50 });
        console.dir(aptRes, { depth: null });
    } catch (err) {
        console.error(err);
    }
}
test();
