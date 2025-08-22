import { Actor, HttpAgent } from '@dfinity/agent';
import { idlFactory } from './kbn_backend.did';
import canisterIds from '../../../canister_ids.json';

const canisterId = canisterIds.kbn_backend.ic;

export const createActor = (identity) => {
  const agent = new HttpAgent({ identity });
  return Actor.createActor(idlFactory, {
    agent,
    canisterId,
  });
};
