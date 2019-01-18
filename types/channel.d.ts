import Vue from 'vue';
import { VueClass } from 'vue-class-component/lib/declarations';
import { ChannelOption } from './declartation';
declare function ChannelFunc<V extends Vue>(options: ChannelOption & ThisType<V>): <VC extends VueClass<V>>(target: VC) => VC;
declare function ChannelFunc<VC extends VueClass<Vue>>(target: VC): VC;
export declare const Channel: typeof ChannelFunc;
export {};
