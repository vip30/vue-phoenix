import Vue from 'vue';

export declare function Obey(eventName: string, channelName?: string): (target: Vue, key: string, descriptor: any) => void;
