package connection;

import org.bson.Document;

import com.mongodb.BasicDBObject;
import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;

public class Sorting {
	public static void main(String args[]){
		// Creating a Mongo client 
	    MongoClient mongoClient = MongoClients.create("mongodb://localhost:27017");
	    MongoDatabase database = mongoClient.getDatabase("vit");

	    // Get the collection
	    MongoCollection<Document> collection = database.getCollection("sales");
	    
	    System.out.println("***ASCENDING ORDER***");
	  //Select a particular document in ascending order
	    FindIterable<Document> documents = collection.find().sort(new BasicDBObject("item",1));
	    
	    for(Document document : documents){
	    	System.out.println(document);
	    }    
	    
	    System.out.println("***DESCENDING ORDER***");
	    
	    documents = collection.find().sort(new BasicDBObject("item",-1));
	    
	    for(Document document : documents){
	    	System.out.println(document);
	    }    
	}
}
