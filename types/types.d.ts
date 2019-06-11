declare type KanbanizeHeaders = {
	/**
	 * APIKey to authenticate requests with.
	 */
	apikey: string
}

declare interface boardidRequired {
	/**
	 * You can see the board ID on the dashboard screen, in the upper right corner of each board.
	 */
	boardid: number;
}

declare type projectsAndBoards = {
	/**
	 * The name of the project
	 */
	name: string;
	/**
	 * The id of the project
	 */
	id: number;
	/**
	 * Array of details for any boards in current project ( name, id )
	 */
	boards: {
		name: string;
		id: number;
	}[];
}[]
declare interface column {
	/**
	 * The position of the column
	 */
	position: number;
	/**
	 * The name of the column.
	 */
	lcname: string;
	/**
	 * The description of the column or swimlane.
	 */
	description: string;
}

declare interface swimlane {
	/**
	 * The name of the swimlane.
	 */
	lcname: string;
	/**
	 * The color of the swimlane.
	 */
	color: string;
	/**
	 * The description of the column or swimlane.
	 */
	description: string;
}

declare interface fullSwimlane extends swimlane {
	/**
	 * Unique identifier of the swimlane which concatenates the string “lane_” 
	 * concatenated with the swimlane ID.
	 */
	path: string;
	/**
	 * Lane/Column ID. This is the ID of the swimlane, which is the last part of 
	 * the path parameter described above.
	 */
	lcid: string;
	/**
	 * The position of the swimlane.
	 */
	position: number;
}

declare interface fullColumn extends column {
	/**
	 * Lane/Column ID. This is the ID of the column, which is the last part of the path 
	 * parameter described above.
	 */
	lcid: string;
	/**
	 * Unique identifier which contains the id of the column with all its parent 
	 * columns. E.g. progress_17_1478 means that the column id is 1478, its parent 
	 * is the column with id 17 and the parent area is IN PROGRESS.
	 */
	path: string;
	/**
	 * If the column has sub-columns, they are returned in the children array recursively.
	 */
	children: fullColumn[];
}

declare type boardStructure = {
	/**
	 * Array containing the board columns (only the columns on last level are returned)
	 */
	columns: column[];
	/**
	 * Array containing the board swimnales.
	 */
	lanes: swimlane[];
}

declare type fullBoardStructure = {
	/**
	 * Array containing the board columns (only the columns on last level are returned)
	 */
	columns: fullColumn[];
	/**
	 * Array containing the board swimnales.
	 */
	lanes: fullSwimlane[];
}

declare type boardSettings = {
	/**
	 * Array containing the usernames of the board members.
	 */
	usernames: string[];
	/**
	 * Associative array containing the URLs to the avatars of the board members.
	 */
	avatars: any[];
	/**
	 * Array containing the templates available to this board.
	 */
	templates: any[];
	/**
	 * Array containing the types available to this board.
	 */
	types: string;
	/**
	 * Array containing the definitions of all custom fields assigned to the board.
	 */
	customFields: any[];
}

declare interface boardActivityParameters extends boardidRequired {
	/**
	 * The date after which the activities of interest happened. 
	 * Accepts the following formats: ‘2012-05-05′, ’10 September 2012’.
	 */
	fromdate: string;
	/**
	 * The date before which the activities of interest happened. 
	 * Accepts the following formats: ‘2012-05-05′, ’10 September 2012’.
	 */
	todate: string;
	/**
	 * Default is 1
	 */
	page?: number;
	/**
	 * Default is 30
	 */
	resultsperpage?: number;
	/**
	 * Default is ALL
	 */
	author?: string;
	/**
	 * Options : Transitions, Updates, Comments, Blocks. Default is All
	 */
	eventtype?: 'Transitions' | 'Updates' | 'Comments' | 'Blocks' | 'All';
	/**
	 * Options: “plain” (default) and “html”. If the plain text format is used, 
	 * the HTML tags are stripped from the history details.
	 */
	textformat?: string;
}

declare type activity = {
	/**
	 * Who performed the action.
	 */
	author: string;
	/**
	 * Type of the event (Task moved, Task blocked, Task archived etc.)
	 */
	event: string;
	/**
	 * History details.
	 */
	text: string;
	/**
	 * When the event happened.
	 */
	date: string;
	/**
	 * The id of the task which was updated/moved/blocked, etc.
	 */
	taskid: taskid;
}

declare type boardActivityOutput = {
	/**
	 * The number of all activities for the corresponding time window
	 * specified by the fromdate and todate parameters.
	 */
	allActivities: number;
	/**
	 * The current page.
	 */
	page: number;
	/**
	 * Array containing the board activities.
	 */
	activities: activity[];
}
declare type priority = 'Low' | 'Average' | 'High' | 'Critical';

declare type subtask = {
	/**
	 * Title of the new subtask.
	 */
	title: string;
	/**
	 * An assignee for the subtask (Default:None).
	 */
	assignee?: string;
}

declare interface createNewTaskParameters extends boardidRequired {
	/**
	 * Title of the task
	 */
	title?: string;
	/**
	 * Description of the task
	 */
	description?: string;
	/**
	 * One of the following: Low, Average, High, Critical
	 */
	priority?: priority;
	/**
	 * Username of the assignee (must be a valid username)
	 */
	assignee?: string;
	/**
	 * Any color code (e.g. #34a97b) without the # character.
	 */
	color?: string;
	/**
	 * Size of the task
	 */
	size?: string;
	/**
	 * Space separated list of tags
	 */
	tags?: string;
	/**
	 * Deadline in the format: yyyy-mm-dd (e.g. 2011-12-13)
	 */
	deadline?: string;
	/**
	 * A link in the following format: https://domain.com/resource.
	 */
	extlink?: string;
	/**
	 * The name of the type you want to set.
	 */
	type?: string;
	/**
	 * The name of the template you want to apply. If you specify any 
	 * property as part of the request, the one specified in the template will 
	 * be overwritten.
	 */
	template?: string;
	/**
	 * An array of subtasks.
	 */
	subtasks?: subtask[];
	/**
	 * The name of the column to create the task into (default is Backlog). 
	 * If column names are not unique, you must specify the full path to the 
	 * column: topParentColumn.nextParentColumn.columnName.
	 */
	column?: string;
	/**
	 * The name of the swimlane to put the newly created task into. If omitted, 
	 * the task will be placed in the first swimlane.
	 */
	lane?: string;
	/**
	 * The position of the task in the new column/swimlane (zero-based). 
	 * If omitted, the task will be placed at the bottom of the column.
	 */
	position?: string;
	/**
	 * If you can exceed a limit with a reason, supply it with this parameter. 
	 * Applicable only if column, lane and/or position are supplied.
	 */
	exceedingReason?: string;
	/**
	 * If set to 1 the method will return the details of the created task.
	 */
	returntaskdetails?: 1 | 0;
}

declare type createNewTaskOutput = {
	/**
	 * The ID of the newly created task.
	 */
	id: number;
	/**
	 * The details of the newly created task. (Only if returntaskdetails was set)
	 */
	details: basicTask;
	/**
	 * If moving failed, the moving error will be returned here. (Only if column, swimlane and/or position were set)
	 */
	movingerror: string;
}

declare interface BasicTaskParameters extends boardidRequired {
	taskid: taskid;
}

declare interface getTaskDetailsParamters extends boardidRequired {
	taskid: taskid | taskid[];
	history?: 'yes' | 'no';
	comments?: 'yes' | 'no';
	/**
	 * Only applicable if “history” is set to “yes”. Accepts the following events: 
	 * move, create, update, block, delete, comment, archived, subtask, loggedtime. 
	 * If the parameter is not set, all of the events will be returned.
	 */
	event?: 'move' | 'create' | 'update' | 'block' | 'delete' | 'comment' | 'archived' | 'subtask' | 'loggedtime'
	textformat?: 'plain' | 'html';
}

declare type customField = {
	/** The id number of the field. */
	fieldid: number;
	/** The name of the field. */
	name: string;
	/** Data type of the custom field {text|date|number|contributor|link|dropdown}. */
	type: string;
	/** The value of the custom field. */
	value: any;
	/** A flag if the field is mandatory {true|false}. */
	mandatory: boolean;
}
declare type attachment = {
	/** A link to the file if it was added from a storage service (Dropbox, Google Drive, etc.). */
	url: string;
	/** The name of the file as uploaded by the user. */
	clientName: string;
	/** Unique name of the file. */
	uniqueName: string;
	/** The size of the file. */
	fileSize: number;
	/** The extension of the file. */
	fileType: string;
	/** Upload status. */
	status: string;
}
declare interface basicTask {
	/** The ID of the task */
	taskid: taskid;
	/** Title of the task */
	title: string
	/** Description of the task */
	description: string
	/** The task type */
	type: string
	/** Username of the assignee */
	assignee: string
	/** Number of subtasks */
	subtasks: string
	/** Number of completed subtasks */
	subtaskscomplete: number;
	/** Task color */
	color: string
	/** Task priority */
	priority: string
	/** Task size */
	size: string
	/** Task deadline in format Day Month (e.g. 01 Aug) */
	deadline: string
	/** Task deadline in format yyyy-mm-dd (e.g. 2012-08-01) */
	deadlineoriginalformat: string
	/** Task external link */
	extlink: string
	/** Task tags */
	tags: string
	/** Leadtime in days */
	leadtime: string
	/** Is the task blocked (0 – no/ 1 – yes) */
	blocked: string
	/** Why the task is blocked */
	blockedreason: string
	/** Details of any subtasks (subtask id, subtask assignee, subtask title, subtask date of completion). */
	subtaskdetails: string
	/** Details of any comment (author, event, text, date, taskid, commentid). */
	comments: string
	/** Details of task history (eventtype, historyevent, details, author, date, history id). */
	historydetails: any;
	/** The name of the column in which the task is located. */
	columnname: string;
	/** The name of the swim-lane in which the task is located. */
	lanename: string
	/** The ID of the column in which the task is located. */
	columnid: string
	/** The ID of the swim-lane in which the task is located. */
	laneid: string
	/** The position of the card in its current column. */
	position: string
	/** The full path to the card column in the format: “Column.Subcolumn1.Subcolumn2”. If the task is located in a main column this will be the same as “columnname”. */
	columnpath: string

	/** Array with the info about the new file(s) attached to the card. */
	attachments: attachment[];
	/** The workflow to which the item belongs (0 – cards workflow / 1 – initiatives workflow). */
	workflow: 0 | 1;
}

declare interface getTaskDetailsOutput extends basicTask {
	/** Array of the custom fields applied to the card. */
	customfields: customField[];
	/** The accumulated logged time of the task in hours. */
	loggedtime: string

}

declare interface getAllTasksOutput extends basicTask {
	/**The accumulated logged time of the task in hours. 
	 * *There is a missing letter G, which has not been added on purpose to maintain backwards compatibility. */
	logedtime: string;
}
declare type yesNo = 'yes' | 'no';

declare interface getAllTaskParameters extends boardidRequired {
	/**
	 * Set to “yes” if you want to get subtask details for each task.
	 */
	subtasks?: yesNo;
	/**
	 * Set to “yes” if you want to get comments for each task.
	 */
	comments?: yesNo;
	/**
	 * Set to “archive” if you want to get tasks from archive. 
	 * See the rest optional parameters for archive output details.
	 */
	container?: string;
	/**
	 * Only applicable with container=”archive”. The date after which the tasks have been 
	 * archived. Accepts the format: ‘2012-05-05’. Default valuе is ‘1970-01-01’
	 */
	fromdate?: string;
	/**
	 * Only applicable with container=”archive”. The date before which the tasks have been 
	 * archived. Accepts the following format: ‘2012-05-05’. Default valuе is ‘now’
	 */
	todate?: string;
	/**
	 * Only applicable with container=”archive”. If this parameter is set to “1” the response
	 *  will return only initiatives. Otherwise, it will return only tasks.
	 */
	showInitiatives?: 1 | 0;
	/**
	 * Gives the tasks from the specified archive version. The fromdate and todate 
	 * parameters are ignored.
	 */
	version?: string;
	/**
	 * Only applicable with container=”archive”. With this parameter you control which page number 
	 * to get. The method returns 30 tasks per page. If not set, the first 30 values will 
	 * be returned i.e. “page” = 1.
	 */
	page?: number;
	/**
	 * Options: “plain” (default) and “html”. If the plain text format is used, the HTML tags
	 * are stripped from the task description.
	 */
	textformat?: 'plain' | 'html';
	/**
	 * Get only cards from a specific column. This field has higher priority than the section option. 
	 * If the name of the column is unique, you can specify it alone but if there are more than one columns with that name, you must specify it as ParentColumn.ColumnName
	 */
	column?: "string";
	/**
	 * Only get cards from that specific lane.
	 */
	lane?: "string";
	/**
	 * Get card from a specific board area (backlog, requested, progress, done, archive)

	 */
	section?: "string;"
}

declare type addCommentParameters = {
	/** 
	 * The comment to be added.
	 */
	comment: string;
	/** 
	 * The ID of the task you want to comment.
	 */
	taskid: taskid;
}

declare type addCommentOutput = {
	/**
	 * ID of the history event
	 */
	id: number;
	/**
	 * Author of the comment
	 */
	author: string;
	/**
	 * Current date
	 */
	date: string;
}

declare interface moveTaskParameters extends boardidRequired {
	/**
	 * The ID of the task to move.
	 */
	taskid: taskid;
	/**
	 * The name of the column to move the task into. If the name of the column is unique, 
	 * you can specify it alone, but if there are more than one columns with that name, 
	 * you must specify it as columnname1.columnname2.columnname3.
	 */
	column?: string;
	/**
	 * The name of the swim-lane to move the task into. If omitted, the swimlane doesn’t change.
	 */
	lane?: string;
	/**
	 * The position of the task in the new column (zero-based). 
	 * If omitted, the task will be placed at the bottom of the column.
 	*/
	position?: number;
	/**
	 * If you can exceed a limit with a reason, supply it with this parameter.
	 */
	exceedingreason?: string;
}

declare type taskOperationOutput = {
	/**
	 * The status of the operation (1 or error).
	 */
	status: 1 | string;
}

declare interface editTaskParameters extends boardidRequired {
	/**
	 * The ID of the task to edit.
	 */
	taskid: taskid;
	title?: string;
	description?: string;
	priority?: "Low" | "Average" | "High" | "Critical";
	/**
	 * Username of the assignee (must be a valid username)
	 */
	assignee?: string;
	/**
	 * Any color code (e.g. #34a97b) without the # character in front of the code.
	 */
	color?: string;
	size?: string;
	/**
	 * Space separated list of tags
	 */
	tags?: string;
	/**
	 * Deadline in the format: yyyy-mm-dd (e.g. 2011-12-13)
	 */
	deadline?: string;
	extlink?: string;
	type?: string;
}

declare interface blockTaskParameters extends boardidRequired {
	taskid: taskid;
	event: 'block' | 'editblock' | 'unblock';
	/**
	 * Required if event is set to ‘block’ or ‘editblock’
	 */
	blockreason?: string;
}

declare interface addSubtaskParameters {
	/**
	 * The ID of the task where the subtask to be created is located.
	 */
	taskparent: number;
	title?: string;
	/**
	 * Username of the assignee (must be a valid username)
	 */
	assignee?: string;
}

declare interface addSubtaskOutput {
	/**
	 * The ID of the newly created subtask or 0 if an error has occurred.
	 */
	status: number;
}

declare interface editSubtaskParameters extends boardidRequired {
	subtaskid: taskid;
	title?: string;
	/**
	 * Username of the assignee (must be a valid username)
	 */
	assignee?: string;
	/**
	 * Options: 1 or 0. If it`s set to 1 the subtask will be marked 
	 * as finished, otherwise as unfinished.
	 */
	complete?: 0 | 1;
}

declare interface logTimeParameters {
	/**
	 * The number of hours you want to add to the task.
	 */
	loggedtime: number;
	/**
	 * The ID of the task or subtask to log time to.
	 */
	taskid: taskid;
	/**
	 * Comment about the log time entry.
	 */
	description?: string;
	/**
	 * Sets the date for which the time is logged. Accepted format is YYYY-MM-DD.
	 */
	date?: string;
}

declare type logTimeOutput = {
	/**
	 * The id of the log time event.
	 */
	id: number;
	/**
	 * The id of the event (for internal use).
	 */
	historyid: number;
	/**
	 * The id of the task or subtask that has been updated with a log time event.
	 */
	taskid: taskid;
	/**
	 * The username of the API user who updated the task.
	 */
	author: string;
	/**
	 * Message explaining the log time event.
	 */
	details: string;
	/**
	 * The number of hours that have been logged.
	 */
	loggedtime: number;
	/**
	 * A boolean parameter that shows whether the task is a subtask or not.
	 */
	issubtask: boolean;
	/**
	 * The title of the task that has been updated.
	 */
	title: string;
	/**
	 * The comment that has been added along with the time log.
	 */
	comment: string;
	/**
	 * Timestamp of the event (no timezone applied ).
	 */
	origindate: string;
	/**
	 * Timestamp of the event (timezone applied ).
	 */
	entrydate: string;
}

/**
 * Id of a task. This can be a subtask or a card.
 */
declare type taskid = string;

declare type getLinksParameters = {
	/**
	 * An integer or an array of integers. Data for the links of all tasks will 
	 * be returned; taskid: An integer or an array of integers for which the links 
	 * data will be returned.
	 */
	boardid?: number | number[];
	/**
	 * An integer or an array of integers. Data for the links of all tasks will 
	 * be returned; taskid: An integer or an array of integers for which the links 
	 * data will be returned.
	 */
	taskid?: taskid | taskid[];
}

declare type getLinksOutput = {
	/**
	 * The id of the task to which the links data belongs.
	 */
	taskid: taskid;
	/**
	 * The task ID of the task assigned as a parent.
	 */
	parent: taskid;
	/**
	 * An array of task IDs, which are children of the task.
	 */
	children: taskid[];
	/**
	 * An array of task IDs, which are mirrors of the task.
	 */
	mirrors: taskid[];
	/**
	 * An array of task IDs, which are relatives of the task.
	 */
	relatives: taskid[];
	/**
	 * An array of task IDs, which are predecessors of the task.
	 */
	predecessors: taskid[];
	/**
	 * An array of task IDs, which are successors of the task.
	 */
	successors: taskid[];
}

declare type editLinkParameters = {
	/**
	 * The ID of the task that will be linked.
	 */
	taskid: taskid;
	action: 'set' | 'unset';
	type: 'child' | 'parent' | 'relative' | 'mirror' | 'predecessor' | 'successor';
	/**
	 * The ID of the task that will be linked to {taskid}.
	 */
	linkedid: taskid;
}
declare type cardid = number;

declare type archiveTaskParameters = {
	/**
	 * Id or ids of cards that will be archived. The cards must be not be blocked, 
	 * in column Done or in column Archive.
	 */
	cardid: cardid | cardid[];
	/**
	 * Version of the archive. When selected it can’t be empty, also can’t be array of values.
	 */
	version?: string;
}

declare type editCustomFieldsParameter = {
	/**
	 * The id of the card for which you want to apply custom field. The custom field 
	 * should already have been created.
	 */
	cardid: cardid;
	fields: { name: string; value: any; }[];
}

declare type getAttachmentParameters = {
	/**
	 * The ID of the card holding the attachment.
	 */
	taskid: cardid;
	/**
	 * The uniqueName parameter of the attachment. Can be obtained through get_task_details or get_all_tasks.
	 */
	uniquename: string;
	/**
	 * Set to “yes” if you want to get a thumbnail of the original attachment. Valid only for image files.
	 */
	thumbnail?: yesNo;
	encoding?: 'binary' | 'base64';
}

declare type getLogTimeActivitiesParameters = {
	/**
	 * The date after which the activities of interest happened. Accepts the following formats: 
	 * ‘2012-05-05′, ’10 September 2012’.
	 */
	fromdate?: string;
	/**
	 * The date before which the activities of interest happened. Accepts the following formats: 
	 * ‘2012-05-05′, ’10 September 2012’.
	 */
	todate?: string;
	/**
	 * The user who performed the activities. Default is ALL
	 */
	author?: string;
}

declare type getLogTimeActivitiesOutput = {
	/**
	 * Who performed the action.
	 */
	author: string;
	/**
	 * When was the time logged for.
	 */
	date: string;
	/**
	 * The ID of the card or subtask the time was logged to.
	 */
	cardid: cardid;
	/**
	 * Name of the column the time was logged in.
	 */
	columnname: string;
	/**
	 * ID of the board the time was logged in.
	 */
	boardid: number;
	/**
	 * whether the time was logged in subtask.
	 */
	loggedinsubtask: boolean;
	/**
	 * the number of logged hours.
	 */
	loggedtime: number;
	/**
	 * title of the card the time was logged in.
	 */
	cardtitle: string;
	/**
	 * type of the card the time was logged in.
	 */
	cardtype: string;
}

declare type getTasksWithLogTimeParameters = {
	/**
	 * The date after which the activities of interest happened. Accepts the following formats: 
	 * ‘2012-05-05′, ’10 September 2012’.
	 */
	fromdate: string;
	/**
	 * The date before which the activities of interest happened. Accepts the following formats: 
	 * ‘2012-05-05′, ’10 September 2012’.
	 */
	todate: string;
	/**
	 * The user who performed the activities. Default is ALL.
	 */
	author?: string;
	/**
	 * The boardid where the cards are located.
	 */
	boardid?: string;
}

declare type getTasksWithLogTimeOutput = {
	/**
	 * The ID of the task
	 */
	taskid: taskid;
	/**
	 * The position of the card in its current column.
	 */
	position: number;
	/**
	 * The task type
	 */
	type: string;
	/**
	 * Username of the assignee
	 */
	assignee: string;
	/**
	 * Title of the task
	 */
	title: string;
	/**
	 * Description of the task
	 */
	description: string;
	/**
	 * Task color
	 */
	color: string;
	/**
	 * Task priority
	 */
	priority: string;
	/**
	 * Task size
	 */
	size: string;
	/**
	 * Task deadline in format yyyy-mm-dd (e.g. 2012-08-01)
	 */
	deadline: string;
	/**
	 * Task external link
	 */
	extlink: string;
	/**
	 * Task tags
	 */
	tags: string;
	/**
	 * The ID of the column in which the task is located.
	 */
	columnid: number;
	/**
	 * The ID of the swim-lane in which the task is located.
	 */
	laneid: number;
	/**
	 * Is the task blocked (0 – no/ 1 – yes)
	 */
	blocked: 0 | 1;
	/**
	 * Why the task is blocked
	 */
	blockedreason: string;
	/**
	 * The name of the column in which the task is located.
	 */
	columnname: string;
	/**
	 * The name of the swim-lane in which the task is located.
	 */
	lanename: string;
	/**
	 * Watchers of the card.
	 */
	subscribers: string;
	/**
	 * The ID of the board where the task is located.
	 */
	boardparent: number;
	/**
	 * Array with the info about the file(s) attached to the card.
	 */
	attachments: attachment[];
	/**
	 * The workflow to which the item belongs (0 – cards workflow / 1 – initiatives workflow).
	 */
	workflow: 0 | 1;
	/**
	 * An array of loggedtime records.
	 */
	loggedtime: {
		/**
		 * Who performed the action.
		 */
		author: string;
		/**
		 * When was the time logged for.
		 */
		date: string;
		/**
		 * Whether the time was logged in subtask.
		 */
		loggedinsubtask: boolean;
		/**
		 * The number of logged hours.
		 */
		loggedtime: number;
	}[];

}