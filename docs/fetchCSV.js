$(document).ready(function (datasource) {

	var indicator = $('#CSV').val();
	var datasource = "https://api.us-west-2.parsable.net/api/analytics/extract/74ab4caf-652b-4fde-be1b-60aac817bc13.csv?start=1631577600&end=1631577730&type=inputs&tz=America%2NewYork&token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MzQwNzE3MjgsImlzcyI6ImF1dGg6cHJvZHVjdGlvbiIsInNlcmE6Y3J0ciI6IjdlM2Q5NWNiLWU1OTgtNDkwNC1hOTFiLTYzYmM1ZDZiYzdiNyIsInNlcmE6c2lkIjoiZDBiNTdjY2UtZmFlNi00M2UyLWFkYjctZTgyOTkzNmUyNTQwIiwic2VyYTp0ZWFtSWQiOiI3NGFiNGNhZi02NTJiLTRmZGUtYmUxYi02MGFhYzgxN2JjMTMiLCJzZXJhOnR5cCI6InBlcnNpc3RlbnQiLCJzdWIiOiIwMmE4MWQyZS1kN2Y0LTQyZjctOTI3NC1mOGEyNmYyZDJiZDcifQ.z1l-Kusksnia_T94fyXBFEEtaEVnHS9gRrVpeJVFl-o";
	var myConnector = tableau.makeConnector();
	
	$('#CSV').on('change keyup paste click', function() {
    indicator = $('#CSV').val();
	datasource = "https://api.us-west-2.parsable.net/api/analytics/extract/74ab4caf-652b-4fde-be1b-60aac817bc13.csv?start=1631577600&end=1631577730&type=inputs&tz=America%2NewYork&token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MzQwNzE3MjgsImlzcyI6ImF1dGg6cHJvZHVjdGlvbiIsInNlcmE6Y3J0ciI6IjdlM2Q5NWNiLWU1OTgtNDkwNC1hOTFiLTYzYmM1ZDZiYzdiNyIsInNlcmE6c2lkIjoiZDBiNTdjY2UtZmFlNi00M2UyLWFkYjctZTgyOTkzNmUyNTQwIiwic2VyYTp0ZWFtSWQiOiI3NGFiNGNhZi02NTJiLTRmZGUtYmUxYi02MGFhYzgxN2JjMTMiLCJzZXJhOnR5cCI6InBlcnNpc3RlbnQiLCJzdWIiOiIwMmE4MWQyZS1kN2Y0LTQyZjctOTI3NC1mOGEyNmYyZDJiZDcifQ.z1l-Kusksnia_T94fyXBFEEtaEVnHS9gRrVpeJVFl-o";
	tableau.connectionData = datasource;
	});
	
	myConnector.getSchema = function (schemaCallback) {

		var source = tableau.connectionData;
		console.log(source)
		
		$.ajax({
			url: source,
			dataType: "text"
		}).done(successFunction);

		function successFunction(data) {
			var data = data.replace(/\"/g, "");
			var data = data.replace(/ /g, '');
			var allRows = data.split(/\r?\n|\r/);
			var cols = [];
			for (var singleRow = 0; singleRow < allRows.length; singleRow++) {
				var rowCells = allRows[singleRow].split(',');
				for (var rowCell = 0; rowCell < rowCells.length; rowCell++) {
					if (singleRow === 0) {
						x = rowCells[rowCell];

						y = {
							id: x,
							alias: x,
							dataType: tableau.dataTypeEnum.string
						};
						cols.push(y);
					}
				}
			}
			console.log(cols);
			var tableInfo = {
				id: "WDCcsv",
				alias: "WDCcsv",
				columns: cols
			};

			schemaCallback([tableInfo]);
		}
	};

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	myConnector.getData = function (table, doneCallback) {

		
		var source = tableau.connectionData;
		
		$.ajax({
			url: source,
			dataType: "text",
		}).done(successFunction);

		function successFunction(data) {
			var data = data.replace(/\"/g, "");
			var allRows = data.split(/\r?\n|\r/);
			var tableData = [];
			var cols = [];
			for (var singleRow = 0; singleRow < allRows.length; singleRow++) {
				var rowCells = allRows[singleRow].split(',');
				for (var rowCell = 0; rowCell < rowCells.length; rowCell++) {
					if (singleRow === 0) {
						x = rowCells[rowCell];
						y = {
							id: x,
							alias: x,
							dataType: tableau.dataTypeEnum.string
						};
						cols.push(y);
					}
				}
				if (singleRow != 0) {
					x = rowCells;

					tableData.push(x);
				}
			}

			table.appendRows(tableData);
			doneCallback();
		}
	};

	tableau.registerConnector(myConnector);

	$(document).ready(function () {
		$("#submitButton").click(function () {
			indicator = $('#CSV').val();
			datasource = "https://api.us-west-2.parsable.net/api/analytics/extract/74ab4caf-652b-4fde-be1b-60aac817bc13.csv?start=1631577600&end=1631577730&type=inputs&tz=America%2NewYork&token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MzQwNzE3MjgsImlzcyI6ImF1dGg6cHJvZHVjdGlvbiIsInNlcmE6Y3J0ciI6IjdlM2Q5NWNiLWU1OTgtNDkwNC1hOTFiLTYzYmM1ZDZiYzdiNyIsInNlcmE6c2lkIjoiZDBiNTdjY2UtZmFlNi00M2UyLWFkYjctZTgyOTkzNmUyNTQwIiwic2VyYTp0ZWFtSWQiOiI3NGFiNGNhZi02NTJiLTRmZGUtYmUxYi02MGFhYzgxN2JjMTMiLCJzZXJhOnR5cCI6InBlcnNpc3RlbnQiLCJzdWIiOiIwMmE4MWQyZS1kN2Y0LTQyZjctOTI3NC1mOGEyNmYyZDJiZDcifQ.z1l-Kusksnia_T94fyXBFEEtaEVnHS9gRrVpeJVFl-o";

			tableau.connectionData = datasource;
			tableau.connectionName = "WDCcsv";
			tableau.connectionData = datasource;
			tableau.submit();
		});
	});

	

});
