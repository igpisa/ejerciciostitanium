$.addListener($.listview, "itemclick", openExercises);

function openExercises(e){
    var tema = "tema1/";
    var listItem = $.listsection.getItemAt(e.itemIndex);

    Alloy.createController(tema + listItem.properties.itemId).getView().open();
}