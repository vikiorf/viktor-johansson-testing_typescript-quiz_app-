## Initial loading of application:
```mermaid
sequenceDiagram
actor User
participant Application
User->>Application: Connect to application
alt no cookies
	Application->>User: Accept Cookies
else no username
	Application->>User: Enter User name
else Cookies and username exists
	Application->>User: Welcome
end
```
