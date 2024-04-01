'use server'

import {Xendit} from 'xendit-node';

import {env} from '~/env.mjs';

const xenditClient = new Xendit({
    secretKey: env.XENDIT_SECRET_KEY,
})
export const async createCharge = () => {
    
}