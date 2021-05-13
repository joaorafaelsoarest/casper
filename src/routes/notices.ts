import { ObjectId } from 'bson';

function create(COLLECTION: string, mongo: any){
    return async (request: any, response: any) => {
        const { linkImage, title, description, theme } = request.body;
        try{
            const result = await mongo.insertOne(COLLECTION, {linkImage, title, description, theme});
            return response.status(200).json(result.ops);
        } catch (err) {
            return response.status(401).json({ message: err.message });
        }
    }
}

function index(COLLECTION: String, mongo: any){
    return async (request: any, response: any) => {
        const { _id } = request.params;
        const result = await mongo.find(COLLECTION, {_id : new ObjectId(_id) });
        response.status(200).json(result);
    }
}

function update(COLLECTION: string, mongo: any){
    return async (request: any, response: any) => {
        const { _id, linkImage, title, description, theme } = request.body;
        try{
            const result = await mongo.updateOne(COLLECTION, { "_id" : new ObjectId(_id) }, { $set: {linkImage, title, description, theme} });
            return response.status(200).json(result);
        } catch(err){
            return response.status(401).json({message: err.message});
        }
    }
}

function delete_n(COLLECTION: string, mongo: any){
    return async (request, response) => {
        const { _id } = request.params;
        const result = mongo.deleteOne(COLLECTION, {"_id": new ObjectId(_id)});
        return response.json({result});
    }
}

export { create, index, update, delete_n };