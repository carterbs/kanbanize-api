## Kanbanize API
This is a thin wrapper around the Kanbanize v1 API, written for (now) nodejs. 

I intend to allow the module to be consumed in web contexts as well

## Todo
1. Test whether it works in a browser
1. Add unit tests
1. Add `addAttachment` method.

## Example Usage

In Node
```javascript
// @todo get rid of .default
const KanbanizeAPI = require("./kanbanize-api/").default;
const API_KEY = `YOUR_API_KEY_HERE`;
const SUBDOMAIN = 'YOUR_COMPANY_SUBDOMAIN';

async function example() {
	const API = new KanbanizeAPI.V1(SUBDOMAIN, API_KEY);
	const allTasks = await API.getAllTasks({
		boardid: 64
	});

	allTasks.forEach(task =>{
		//do something with the data
	})
}

example();
```


## Methods

See [Type Definitions](types/types.d.ts) for method parameter and return shapes.

```
getProjectsAndBoards(): Promise<projectsAndBoards>;
```
```
getBoardStructure(params: boardidRequired): Promise<boardStructure>
```
```
getFullBoardStructure(params: boardidRequired): Promise<fullBoardStructure>
```
```
getBoardSettings(params: boardidRequired): Promise<boardSettings>
```
```
getBoardActivities(params: boardActivityParameters): Promise<boardActivityOutput>
```
```
createNewTask(params: createNewTaskParameters): Promise<createNewTaskOutput>
```
```
deleteTask(params: BasicTaskParameters): Promise<taskOperationOutput>
```
```
getTaskDetails(params: getTaskDetailsParamters): Promise<getTaskDetailsOutput>
```
```
getAllTasks(params: getAllTaskParameters): Promise<getAllTasksOutput>
```
```
addComment(params: addCommentParameters): Promise<addCommentOutput>
```
```
moveTask(params: moveTaskParameters): Promise<taskOperationOutput>
```
```
editTask(params: editTaskParameters): Promise<taskOperationOutput>
```
```
blockTask(params: blockTaskParameters): Promise<taskOperationOutput>
```
```
addSubtask(params: addSubtaskParameters): Promise<addSubtaskOutput>
```
```
editSubtask(params: editSubtaskParameters): Promise<taskOperationOutput>
```
```
logTime(params: logTimeParameters): Promise<logTimeOutput>
```
```
getLinks(params: getLinksParameters): Promise<getLinksOutput>
```
```
editLink(params: editLinkParameters): Promise<taskOperationOutput>
```
```
archiveTask(params: archiveTaskParameters): Promise<taskOperationOutput>
```
```
editCustomFields(params: editCustomFieldsParameter): Promise<taskOperationOutput>
```
```
getAttachment(params: getAttachmentParameters): Promise<any>
```
```
getLogTimeActivities(params: getLogTimeActivitiesParameters): Promise<getLogTimeActivitiesOutput> 
```
```
getTasksWithLogTime(params: getTasksWithLogTimeParameters): Promise<getTasksWithLogTimeOutput>
```