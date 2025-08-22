import { Actor, HttpAgent } from '@dfinity/agent';
import { IDL } from '@dfinity/candid';
import idlContent from './kbn_backend.did';
import canisterIds from '../../../canister_ids.json';

const canisterId = canisterIds.kbn_backend.ic;

export const createActor = (identity) => {
  const agent = new HttpAgent({ identity });
  const idlFactory = ({ IDL }) => {
    return IDL.Service({
      // Your service methods here
    });
  };
  return Actor.createActor(idlFactory, {
    agent,
    canisterId,
  });
};
