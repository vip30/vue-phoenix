import { Channel, Socket } from 'phoenix';
export default class ChannelKeeper {
    private socket;
    private channels;
    constructor(socket: Socket);
    retrieveChannel(channelName: string, params?: object): Channel;
}
