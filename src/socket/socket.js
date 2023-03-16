import io from 'socket.io-client';
import PORT from '../services/port';
const socket = io.connect(PORT);

export default socket;