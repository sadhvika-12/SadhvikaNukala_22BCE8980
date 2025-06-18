package connection;

import org.bson.Document;

import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;

public class LimitAndSkip {
	public static void main(String args[]){
		// Creating a Mongo client 
	    MongoClient mongoClient = MongoClients.create("mongodb://localhost:27017");
	    MongoDatabase database = mongoClient.getDatabase("vit");

	    // Get the collection
	    MongoCollection<Document> collection = database.getCollection("sales");
	    
	  //Select a particular document
	    FindIterable<Document> documents = collection.find().limit(2);
	    
	    for(Document document : documents){
	    	System.out.println(document);
	    }    
	    
	    System.out.println("****Skip with LIMIT****");
	    
	  //Select a particular document
	    documents = collection.find().skip(2).limit(2);
	    
	    for(Document document : documents){
	    	System.out.println(document);
	    }    
	}
}
