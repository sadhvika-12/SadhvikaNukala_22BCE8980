package connection;

import org.bson.Document;

import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.model.Filters;

public class retriveData {
	public static void main(String args[]){
		// Creating a Mongo client 
	    MongoClient mongoClient = MongoClients.create("mongodb://localhost:27017");
	    MongoDatabase database = mongoClient.getDatabase("myDb");

	    // Get the collection
	    MongoCollection<Document> collection = database.getCollection("sampleCollection");
	
	    //Find all documents
	    FindIterable<Document> allDocuments = collection.find();
	    
	    for(Document document: allDocuments){
	    	System.out.println(document);
	    }
	    System.out.println("***Selected Document***");
	    
	    // Select a particular document
	    FindIterable<Document> documents = collection.find(Filters.eq("First_Name", "Mahesh"));
	    for(Document document: documents){
	 	    	System.out.println(document);
   	    }
	}
}
