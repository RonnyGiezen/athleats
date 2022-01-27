FROM eclipse-temurin
ARG JAR_FILE=*.jar
COPY ${JAR_FILE} app.jar
EXPOSE 3080
ENTRYPOINT ["java","-jar","/app.jar"]
