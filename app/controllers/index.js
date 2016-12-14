$.addListener($.listview, "itemclick", openExercises);

function openExercises(e){
    var listItem = $.listsection.getItemAt(e.itemIndex);

    Alloy.createController(listItem.properties.itemId + "/ejercicios").getView().open();
}

$.win.open();
