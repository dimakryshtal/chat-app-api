import { getDb } from './connection.js';

export async function getNextSequenceValue(sequenceName) {
    const sequenceDocument = await getDb().collection('counters').findOneAndUpdate({ _id: sequenceName }, { $inc: { sequence_value: 1 } });

    return sequenceDocument.value.sequence_value;
}
