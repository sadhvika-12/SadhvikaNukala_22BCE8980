package connection;
import org.bson.Document;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.MongoIterable;

public class MongoDBConnection {
   public static void main(String[] args) {
      // Creating a Mongo client 
      MongoClient mongoClient = MongoClients.create("mongodb://localhost:27017");
      MongoDatabase database = mongoClient.getDatabase("monday123");
      database.createCollection("employeeRecord");
      
      //Retrieving a collection
      MongoCollection<Document> collection = database.getCollection("sampleCollection");
      Document document = new Document("title", "MondoDB");
      
      //Inserting document into the collection
      collection.insertOne(document);
      
      //drop the database
      database.drop();
      System.out.println("Database dropped");
      
      // Print the databases
      MongoIterable<String> loop1 = mongoClient.listDatabaseNames();
      for (String name : loop1) {
         System.out.println(name);
      }
      
   }
}