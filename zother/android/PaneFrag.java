package com.example.pp;

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
import apaKau.android.BaseDBEnt;
import apaKau.api.Query;
import apaKau.client.Call;

public class PaneFrag extends Fragment implements OnClickListener {
private static final String TAG = "Frag";

MyAdapter _myList;
BaseDBEnt _ent;
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
	_myList = new MyAdapter(ctx, "123"); // apaKau
	listView.setAdapter(_myList);
	row4.addView(listView);
	layout.addView(row4);

	_ent = new BaseDBEnt("stores", "123", ctx, "id"); // apaKau
	
	return layout;
}

@SuppressWarnings({ "rawtypes", "unchecked" })
public void onClick(View v) {
	Log.w(TAG, "clicked " + v.getTag());

	if ("exit".equals(v.getTag())) {
		this.getActivity().finish();
		android.os.Process.killProcess(android.os.Process.myPid());
	}
	if ("selA".equals(v.getTag())) {
		Call.setBase("http://192.241.221.213:8080/edgeNode/");//sf
		Query q = new Query("stores");
		q.addOrder("key desc");
		_myList.qry(q); // apaKau
	}
	if ("selB".equals(v.getTag())) {
		Call.setBase("http://198.211.120.170:8080/edgeNode/"); //ams
		Query q = new Query("stores");
		q.addOrder("key desc");
		_myList.qry(q);
	}
	if ("insA".equals(v.getTag())) {
		Call.setBase("http://192.241.221.213:8080/edgeNode/");//sf
		String name = _nameField.getText().toString();
		Map cols = new HashMap();
		cols.put("name", name);
		_ent.ins(cols); // apaKau
		_nameField.setText("");
	}
	if ("insB".equals(v.getTag())) {
		Call.setBase("http://198.211.120.170:8080/edgeNode/"); //ams
		String name = _nameField.getText().toString();
		Map cols = new HashMap();
		cols.put("name", name);
		_ent.ins(cols);
		_nameField.setText("");
	}
		
	
}// onclick
}
