package org.xylem;


import java.util.Map;

import xylem.AbsQAdapt;
import android.app.Activity;
import android.view.View;
import android.widget.LinearLayout;
import android.widget.TextView;

public class MyAdapter extends AbsQAdapt {
private static final String TAG = "MyAdapter";

public MyAdapter(Activity context) throws Exception {
	super(context,  "hidgiak63lb" , "12" );// just pass it to base
}

/**
 * Paint the row w/ columns
 * This is a method you must implement
 */
protected View makeRowView(int rowNum) {
	LinearLayout row = new LinearLayout(_context);
	Map cols = _data.get(rowNum);
	
	TextView txtLab = new TextView(_context);
	txtLab.setText(cols.get("name").toString());
	row.addView(txtLab);
	
	return row;
}

}
