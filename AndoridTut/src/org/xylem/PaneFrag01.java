package org.xylem;


import java.util.HashMap;
import java.util.Map;

import android.app.Activity;
import android.app.Fragment;
import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.View.OnClickListener;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ListView;
import android.widget.TableLayout;
import android.widget.TableRow;
import android.widget.TextView;

public class PaneFrag01 extends Fragment implements OnClickListener {
private static final String TAG = "Frag";

EditText _nameField;

/**
 * Paint the view/pane
 */
public View onCreateView(LayoutInflater inf, ViewGroup cont,
		Bundle savedInst) {

	Activity ctx = this.getActivity();
	TableLayout layout = new TableLayout(ctx);

	TableRow row1 = new TableRow(ctx);
	TextView nameLab = new TextView(ctx);
	nameLab.setText("Store name:");
	row1.addView(nameLab);
	_nameField = new EditText(ctx);
	row1.addView(_nameField);
	layout.addView(row1);

	TableRow row2 = new TableRow(ctx);
	Button insA = new Button(ctx);
	insA.setTag("insA");
	insA.setText("Insert A");
	insA.setOnClickListener(this);
	row2.addView(insA);
	Button insB = new Button(ctx);
	insB.setTag("insB");
	insB.setText("Insert B");
	insB.setOnClickListener(this);
	row2.addView(insB);
	layout.addView(row2);

	TableRow row3 = new TableRow(ctx);
	Button selA = new Button(ctx);
	selA.setTag("selA");
	selA.setText("Select A");
	selA.setOnClickListener(this);
	row3.addView(selA);
	Button selB = new Button(ctx);
	selB.setTag("selB");
	selB.setText("Select B");
	selB.setOnClickListener(this);
	row3.addView(selB);

	Button exit = new Button(ctx);
	exit.setTag("exit");
	exit.setText("Exit");
	exit.setOnClickListener(this);
	row3.addView(exit);
	layout.addView(row3);

	TableRow row4 = new TableRow(ctx);
	ListView listView = new ListView(ctx);
	
	row4.addView(listView);
	layout.addView(row4);
	 
	
	return layout;
}

@SuppressWarnings({ "rawtypes", "unchecked" })
public void onClick(View v) {
	Log.w(TAG, "clicked: " + v.getTag());

	if ("exit".equals(v.getTag())) {
		this.getActivity().finish();
		android.os.Process.killProcess(android.os.Process.myPid());
	}

	
	
}// onclick
}
